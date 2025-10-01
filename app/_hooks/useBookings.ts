"use client"

import { useTransition } from "react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"
import { deleteBooking } from "../_actions/delete-booking"
import { CreateBookingInput } from "../_schemas"

export const useBookings = () => {
  const [isPending, startTransition] = useTransition()

  const handleCreateBooking = async (data: CreateBookingInput) => {
    startTransition(async () => {
      try {
        await createBooking(data)
        toast.success("Agendamento realizado com sucesso!")
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao agendar"
        toast.error(message)
      }
    })
  }

  const handleDeleteBooking = async (bookingId: string) => {
    startTransition(async () => {
      try {
        await deleteBooking(bookingId)
        toast.success("Agendamento cancelado com sucesso!")
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro ao cancelar"
        toast.error(message)
      }
    })
  }

  return {
    isPending,
    createBooking: handleCreateBooking,
    deleteBooking: handleDeleteBooking,
  }
}
