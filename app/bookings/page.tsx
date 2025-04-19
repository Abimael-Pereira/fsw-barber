import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludeBookings } from "../_data/get-conclude-bookings"
import ResponsivePageBooking from "./_components/responsive-page-booking"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()
  const concludeBookings = await getConcludeBookings()
  return (
    <>
      <Header />
      <ResponsivePageBooking
        concludeBookings={concludeBookings}
        confirmedBookings={confirmedBookings}
      />
    </>
  )
}

export default Bookings
