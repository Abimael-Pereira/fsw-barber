"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"
import { createBookingSchema, type CreateBookingInput } from "../_schemas"

export const createBooking = async (params: CreateBookingInput) => {
  try {
    const validatedData = createBookingSchema.parse(params)

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado")
    }

    const service = await db.barberShopService.findUnique({
      where: { id: validatedData.serviceId },
    })

    if (!service) {
      throw new Error("Serviço não encontrado")
    }

    const existingBooking = await db.booking.findFirst({
      where: {
        serviceId: validatedData.serviceId,
        date: validatedData.date,
      },
    })

    if (existingBooking) {
      throw new Error("Horário já ocupado")
    }

    await db.booking.create({
      data: {
        serviceId: validatedData.serviceId,
        date: validatedData.date,
        userId: session.user.id,
      },
    })

    revalidatePath("/bookings")

    return { success: true }
  } catch (error) {
    console.error("Erro ao criar booking:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("Erro interno do servidor")
  }
}
