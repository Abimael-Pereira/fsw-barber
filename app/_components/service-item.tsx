import { BarberShopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarberShopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-2">
        <div className="relative max-h-[90px] min-h-[90px] min-w-[90px] max-w-[90px]">
          <Image
            src={service.imageUrl}
            fill
            className="rounded-xl object-cover"
            alt={service.name}
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-xs text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant="secondary" size="sm">
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
