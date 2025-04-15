"use server"

import { getServerSession } from "next-auth"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { revalidatePath } from "next/cache"

interface CreateBookingProps {
  serviceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingProps) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("User not authenticated")
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as any)?.id },
  })
  revalidatePath("/bookings")
}
