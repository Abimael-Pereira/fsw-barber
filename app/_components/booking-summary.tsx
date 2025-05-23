import { ptBR } from "date-fns/locale"
import { Card, CardContent } from "./ui/card"
import { format } from "date-fns"
import { BarberShop, BarberShopService } from "@prisma/client"

interface BookingSummaryProps {
  service: Pick<BarberShopService, "name" | "price">
  barbershop: Pick<BarberShop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card className="w-full">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Data</h2>
          <p className="text-sm text-gray-400">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Horário</h2>
          <p className="text-sm text-gray-400">
            {format(selectedDate, "HH:mm")}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Barbearia</h2>
          <p className="text-sm text-gray-400">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
