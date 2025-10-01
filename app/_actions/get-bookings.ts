"use server"

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"
import { getBookingsSchema, type GetBookingsInput } from "../_schemas"

export const getBookings = async (params: GetBookingsInput) => {
  try {
    const validatedData = getBookingsSchema.parse(params)

    const service = await db.barberShopService.findUnique({
      where: { id: validatedData.serviceId },
      select: { id: true },
    })

    if (!service) {
      throw new Error("Serviço não encontrado")
    }

    const bookings = await db.booking.findMany({
      where: {
        serviceId: validatedData.serviceId,
        date: {
          lte: endOfDay(validatedData.date),
          gte: startOfDay(validatedData.date),
        },
      },
      select: {
        id: true,
        date: true,
        userId: true,
      },
      orderBy: {
        date: "asc",
      },
    })

    return bookings
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("Erro interno do servidor")
  }
}
