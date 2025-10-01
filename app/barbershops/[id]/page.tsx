import Header from "@/app/_components/header"
import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"
import ResponsiveBarbershopPage from "../_components/responsive-barbershop-page"

interface BarberShopPageProps {
  params: {
    id: string
  }
}

const BarberShopPage = async ({ params }: BarberShopPageProps) => {
  const barbershop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <Header />
      <ResponsiveBarbershopPage barberShop={barbershop} />
    </div>
  )
}

export default BarberShopPage
