"use client"

import { useTransition } from "react"
import { createBooking } from "../_actions/create-booking"
import { deleteBooking } from "../_actions/delete-booking"
import { CreateBookingInput } from "../_schemas"
import { showToast } from "../_lib/toast"

export const useBookings = () => {
  const [isPending, startTransition] = useTransition()

  const handleCreateBooking = async (data: CreateBookingInput) => {
    startTransition(async () => {
      try {
        await createBooking(data)
        showToast.booking.created()
      } catch (error) {
        const message = error instanceof Error ? error.message : ""

        if (message.includes("já ocupado")) {
          showToast.booking.conflictError()
        } else if (message.includes("não autenticado")) {
          showToast.booking.authError()
        } else {
          showToast.booking.genericError()
        }
      }
    })
  }

  const handleDeleteBooking = async (bookingId: string) => {
    startTransition(async () => {
      try {
        await deleteBooking(bookingId)
        showToast.booking.deleted()
      } catch (error) {
        const message = error instanceof Error ? error.message : ""

        if (message.includes("não autenticado")) {
          showToast.auth.loginRequired()
        } else {
          showToast.error("Erro ao cancelar agendamento")
        }
      }
    })
  }

  return {
    isPending,
    createBooking: handleCreateBooking,
    deleteBooking: handleDeleteBooking,
  }
}
