import { MapPinIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Prisma } from "@prisma/client"

interface BarbershopPageMobileProps {
  barberShop: Prisma.BarberShopGetPayload<{
    include: {
      services: true
    }
  }>
}

const BarbershopPageMobile = ({ barberShop }: BarbershopPageMobileProps) => {
  return (
    <>
      <div className="relative h-[250px] w-full">
        <Image
          alt={barberShop.name}
          src={barberShop.imageUrl}
          fill
          className="object-cover"
        />
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barberShop.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barberShop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (895 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-justify text-sm">{barberShop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barberShop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barberShop={JSON.parse(JSON.stringify(barberShop))}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barberShop.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </>
  )
}

export default BarbershopPageMobile
