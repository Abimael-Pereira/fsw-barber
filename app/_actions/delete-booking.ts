"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { deleteBookingSchema } from "../_schemas"

export const deleteBooking = async (bookingId: string) => {
  try {
    const validatedData = deleteBookingSchema.parse({ id: bookingId })

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado")
    }

    const booking = await db.booking.findUnique({
      where: { id: validatedData.id },
      select: { userId: true, date: true },
    })

    if (!booking) {
      throw new Error("Agendamento não encontrado")
    }

    if (booking.userId !== session.user.id) {
      throw new Error("Você não tem permissão para cancelar este agendamento")
    }

    if (booking.date < new Date()) {
      throw new Error("Não é possível cancelar agendamentos já realizados")
    }

    await db.booking.delete({
      where: { id: validatedData.id },
    })

    revalidatePath("/bookings")

    return { success: true }
  } catch (error) {
    console.error("Erro ao deletar booking:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("Erro interno do servidor")
  }
}
