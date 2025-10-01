import { z } from "zod"

// Schemas para Booking
export const createBookingSchema = z.object({
  serviceId: z.string().uuid("ID do serviço deve ser um UUID válido"),
  date: z.date().min(new Date(), "A data deve ser futura"),
})

export const deleteBookingSchema = z.object({
  id: z.string().uuid("ID do booking deve ser um UUID válido"),
})

export const getBookingsSchema = z.object({
  serviceId: z.string().uuid("ID do serviço deve ser um UUID válido"),
  date: z.date(),
})

// Type inference para melhor developer experience
export type CreateBookingInput = z.infer<typeof createBookingSchema>
export type DeleteBookingInput = z.infer<typeof deleteBookingSchema>
export type GetBookingsInput = z.infer<typeof getBookingsSchema>

// Schema para validação de usuário autenticado
export const authenticatedUserSchema = z.object({
  id: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string().nullable().optional(),
  email: z.string().email().nullable().optional(),
  image: z.string().nullable().optional(),
})

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>
