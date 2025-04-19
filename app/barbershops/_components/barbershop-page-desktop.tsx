import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Prisma } from "@prisma/client"
import { MapPin, StarIcon } from "lucide-react"
import Image from "next/image"

interface BarbershopPageDesktopProps {
  barbershop: Prisma.BarberShopGetPayload<{
    include: {
      services: true
    }
  }>
}

const WEEK_OPEN = [
  { day: "domingo", hours: "Fechado" },
  { day: "segunda", hours: "08:00 - 18:00" },
  { day: "terça", hours: "08:00 - 18:00" },
  { day: "quarta", hours: "08:00 - 18:00" },
  { day: "quinta", hours: "08:00 - 18:00" },
  { day: "sexta", hours: "08:00 - 18:00" },
  { day: "sábado", hours: "Fechado" },
]

const BarbershopPageDesktop = ({ barbershop }: BarbershopPageDesktopProps) => {
  return (
    <div className="flex justify-center gap-10 px-32 pt-10">
      <div className="max-w-[758px]">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          width={758}
          height={486}
          className="rounded-lg object-cover"
        />
        <div className="mt-5 flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold">{barbershop.name}</h1>
            <div className="flex items-center text-sm">
              <MapPin size={18} className="mr-2 text-primary" />
              <p>{barbershop.address}</p>
            </div>
          </div>
          <div className="flex h-[68px] w-[121px] flex-col items-center justify-center gap-1 rounded-lg bg-secondary">
            <div className="flex items-center justify-center gap-2">
              <StarIcon size={20} className="fill-primary text-primary" />
              <p className="text-xl font-light">5,0</p>
            </div>
            <p className="text-xs font-light">889 avaliações</p>
          </div>
        </div>
        <h2 className="mt-10 text-xs font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="grid grid-cols-2 gap-5 pt-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>

      <div>
        <Card className="w-[430px] rounded-xl">
          <CardContent className="p-0">
            <div className="px-5">
              <div className="relative mt-6 flex h-[180px] w-full items-end">
                <Image
                  alt={`Mapa da barbearia ${barbershop.name}`}
                  src="/map.png"
                  fill
                  className="rounded-xl object-cover"
                />
                <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                  <CardContent className="flex items-center gap-3 px-5 py-3">
                    <Avatar>
                      <AvatarImage src={barbershop.imageUrl} />
                    </Avatar>
                    <div>
                      <h3 className="font-bold">{barbershop.name}</h3>
                      <p className="text-xs">{barbershop.address}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <h2 className="mt-5 text-sm font-bold uppercase">sobre nós</h2>
              <p className="mt-2 text-sm text-gray-400">
                {barbershop.description}
              </p>

              <div className="mt-5 space-y-2 border-b border-t border-solid py-5">
                {barbershop.phones.map((phone, index) => (
                  <PhoneItem phone={phone} key={index} />
                ))}
              </div>

              <div className="space-y-2 border-b border-solid py-5">
                {WEEK_OPEN.map(({ day, hours }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-sm capitalize text-gray-400">
                      {day}
                    </span>
                    <span className="text-sm">{hours}</span>
                  </div>
                ))}
              </div>

              <div className="my-10 flex items-center justify-between">
                <p>Em parceria com:</p>
                <Image src="/logo.png" height={18} width={120} alt="Logo" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BarbershopPageDesktop
