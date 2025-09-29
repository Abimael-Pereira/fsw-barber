"use client"

import { BarberShop, BarberShopService, Booking } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useMemo, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { getBookings } from "../_actions/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"
import BookingSummary from "./booking-summary"
import { useRouter } from "next/navigation"

interface ServiceItemProps {
  service: BarberShopService
  barbershop: Pick<BarberShop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
]

interface GetTimeListProps {
  booking: Booking[]
  selectedDay: Date
}

const getTimeList = ({ booking, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookinOnCurrentTime = booking.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookinOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBooking, setDayBooking] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    if (!selectedDay) {
      return
    }
    const fetch = async () => {
      const booking = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBooking(booking)
    }
    fetch()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) {
      return undefined
    }
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedTime, selectedDay])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBooking([])
    setBookingSheetIsOpen(false)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDate) {
        return
      }
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Agendamento criado com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => {
            router.push("/bookings")
          },
        },
      })
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao criar o agendamento. Tente novamente mais tarde.",
      )
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }
    return getTimeList({ booking: dayBooking, selectedDay })
  }, [dayBooking, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-2">
          <div className="relative max-h-[90px] min-h-[90px] min-w-[90px] max-w-[90px]">
            <Image
              src={service.imageUrl}
              fill
              className="rounded-xl object-cover"
              alt={service.name}
            />
          </div>
          <div className="w-full space-y-1">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-xs text-gray-400">{service.description}</p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>
                <SheetContent className="overflow-x-auto px-0 [&::-webkit-scrollbar]:hidden">
                  <SheetHeader>
                    <SheetTitle className="px-5">Fazer reserva</SheetTitle>
                  </SheetHeader>

                  <div className="w-full border-b border-solid py-5">
                    <div className="w-full">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={selectedDay}
                        onSelect={handleDateSelect}
                        fromDate={new Date()}
                        className="w-full [&_div]:w-full"
                        styles={{
                          root: {
                            width: "100%",
                          },
                          row: {
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            width: "100%",
                          },
                          head_row: {
                            display: "grid",
                            gridTemplateColumns: "repeat(7, 1fr)",
                            width: "100%",
                          },
                          cell: {
                            width: "100%",
                            height: "48px",
                          },
                          button: {
                            width: "100%",
                            height: "100%",
                          },
                          nav: {
                            display: "flex",
                            justifyContent: "space-between",
                          },
                          nav_button_previous: {
                            width: "32px",
                            height: "32px",
                          },
                          nav_button_next: {
                            width: "32px",
                            height: "32px",
                          },
                          caption: {
                            textTransform: "capitalize",
                            textAlign: "center",
                            justifyContent: "center",
                            display: "flex",
                            width: "100%",
                          },

                          head_cell: {
                            textTransform: "capitalize",
                            textAlign: "center",
                          },
                        }}
                      />
                    </div>
                  </div>

                  {selectedDay && (
                    <div className="flex gap-4 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDay && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        selectedDate={selectedDay}
                        selectedTime={selectedTime}
                        service={service}
                        key={service.id}
                      />
                    </div>
                  )}

                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        disabled={!selectedDate || !selectedTime}
                        type="submit"
                        onClick={handleCreateBooking}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={signInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
