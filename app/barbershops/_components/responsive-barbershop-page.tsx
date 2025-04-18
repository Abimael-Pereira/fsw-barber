"use client"

import { Prisma } from "@prisma/client"
import BarbershopPageMobile from "./barbershop-page-mobile"
import { useIsDesktop } from "@/app/_hooks/useIsDesktop"
import BarbershopPageDesktop from "./barbershop-page-desktop"

interface BarbershopPageMobileProps {
  barbershop: Prisma.BarberShopGetPayload<{
    include: {
      services: true
    }
  }>
}

const ResponsiveBarbershopPage = ({
  barbershop,
}: BarbershopPageMobileProps) => {
  const isDesktop = useIsDesktop()
  console.log(isDesktop)
  return (
    <>
      {isDesktop ? (
        <BarbershopPageDesktop barbershop={barbershop} />
      ) : (
        <BarbershopPageMobile barbershop={barbershop} />
      )}
    </>
  )
}

export default ResponsiveBarbershopPage
