import BookingCanceledButton from "@/app/_components/booking-canceled-button"
import BookingSummary from "@/app/_components/booking-summary"
import PhoneItem from "@/app/_components/phone-item"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"
import { BookingWithServiceAndBarbershop } from "@/app/_types/booking-service-barbershop"
import { isFuture } from "date-fns"
import Image from "next/image"

interface BookingSummaryCardProps {
  booking: BookingWithServiceAndBarbershop
}

const BookingSummaryCard = ({ booking }: BookingSummaryCardProps) => {
  const isConfirmed = isFuture(booking.date)

  const { barberShop } = booking.service
  return (
    <Card className="w-[430px] rounded-xl">
      <CardContent className="p-0">
        <div className="px-5">
          <div className="relative mt-6 flex h-[180px] w-full items-end">
            <Image
              alt={`Mapa da barbearia ${barberShop.name}`}
              src="/map.png"
              fill
              className="rounded-xl object-cover"
            />
            <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
              <CardContent className="flex items-center gap-3 px-5 py-3">
                <Avatar>
                  <AvatarImage src={barberShop.imageUrl} />
                </Avatar>
                <div>
                  <h3 className="font-bold">{barberShop.name}</h3>
                  <p className="text-xs">{barberShop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <h2 className="mt-5 text-sm font-bold uppercase">sobre nós</h2>
          <p className="mt-2 text-sm text-gray-400">{barberShop.description}</p>

          <div className="mt-5 space-y-2 border-b border-t border-solid py-5">
            {barberShop.phones.map((phone, index) => (
              <PhoneItem phone={phone} key={index} />
            ))}
          </div>

          <div className="my-5 space-y-3">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>
            <BookingSummary
              barbershop={barberShop}
              selectedDate={booking.date}
              service={booking.service}
            />
          </div>
          <div className="mb-5">
            {isConfirmed && <BookingCanceledButton booking={booking} />}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummaryCard
