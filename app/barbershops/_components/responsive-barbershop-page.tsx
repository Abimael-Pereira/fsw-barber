"use client"

import { Prisma } from "@prisma/client"
import BarbershopPageMobile from "./barbershop-page-mobile"
import { useIsDesktop } from "@/app/_hooks/useIsDesktop"
import BarbershopPageDesktop from "./barbershop-page-desktop"

interface BarbershopPageMobileProps {
  barberShop: Prisma.BarberShopGetPayload<{
    include: {
      services: true
    }
  }>
}

const ResponsiveBarbershopPage = ({
  barberShop,
}: BarbershopPageMobileProps) => {
  const isDesktop = useIsDesktop()
  return (
    <>
      {isDesktop ? (
        <BarbershopPageDesktop barberShop={barberShop} />
      ) : (
        <BarbershopPageMobile barberShop={barberShop} />
      )}
    </>
  )
}

export default ResponsiveBarbershopPage
