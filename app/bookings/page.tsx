import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import BookingItem from "../_components/bookingItem"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }
  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barberShop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
  const concludeBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barberShop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
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
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
