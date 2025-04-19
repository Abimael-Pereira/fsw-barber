import { Prisma } from "@prisma/client"

export type BookingWithServiceAndBarbershop = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barberShop: true
      }
    }
  }
}>
