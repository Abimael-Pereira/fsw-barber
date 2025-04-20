"use client"

import BookingItem from "@/app/_components/bookingItem"
import { useState } from "react"
import BookingSummaryCard from "./booking-summary-card"
import { BookingWithServiceAndBarbershop } from "@/app/_types/booking-service-barbershop"
import { useIsDesktop } from "@/app/_hooks/useIsDesktop"

interface ResponsivePageBookingProps {
  confirmedBookings: BookingWithServiceAndBarbershop[]
  concludeBookings: BookingWithServiceAndBarbershop[]
}

const ResponsivePageBooking = ({
  confirmedBookings,
  concludeBookings,
}: ResponsivePageBookingProps) => {
  const isDesktop = useIsDesktop()
  const [bookingSelected, setBookingSelected] =
    useState<BookingWithServiceAndBarbershop | null>(null)

  const handleBookingSelected = (booking: BookingWithServiceAndBarbershop) => {
    setBookingSelected(booking)
  }

  const handleBookingCanceled = () => {
    setBookingSelected(null)
  }
  return (
    <>
      <div className="flex justify-center gap-10 p-5">
        <div className="space-y-3">
          <h1 className="text-xl font-bold">Agendamentos</h1>
          {confirmedBookings.length === 0 && concludeBookings.length === 0 && (
            <p className="text-gray-400">Você não tem agendamentos.</p>
          )}
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                confirmados
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem
                  onClick={() => handleBookingSelected(booking)}
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
          {concludeBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                finalizados
              </h2>
              {concludeBookings.map((booking) => (
                <BookingItem
                  onClick={() => handleBookingSelected(booking)}
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </>
          )}
        </div>

        {isDesktop && (
          <div className="mt-[68px]">
            {bookingSelected && (
              <BookingSummaryCard
                booking={bookingSelected}
                isBookingCanceled={() => handleBookingCanceled()}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ResponsivePageBooking
