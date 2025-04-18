import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import BarbershopItem from "./_components/barbershop-item"
import { db } from "./_lib/prisma"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/bookingItem"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barberShop.findMany({})
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      {/* HERO COM IMAGEM DE FUNDO */}
      <div className="relative mt-6 w-full md:mt-0 md:h-[463px]">
        <Image
          src="/bg-mainpage.jpeg"
          alt="Background"
          fill
          className="hidden object-cover object-top grayscale md:block"
        />
        <div className="absolute inset-0 hidden bg-black/70 md:block" />

        <div className="relative z-10 flex h-full items-center px-5 lg:px-32">
          <div className="w-full lg:max-w-2xl">
            <h2 className="text-2xl font-bold text-white">
              Olá, {session?.user ? session.user.name : "faça seu login!"}
            </h2>
            <p className="text-white">
              <span className="capitalize">
                {format(new Date(), "EEEE, dd ", { locale: ptBR })}
              </span>
              de
              <span className="capitalize">
                {format(new Date(), " MMMM", { locale: ptBR })}
              </span>
            </p>

            <div className="mt-6 lg:mr-32">
              <Search />
              {confirmedBookings.length > 0 && (
                <>
                  <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    agendamentos
                  </h2>

                  {/* TODO: Componentizar os confirmedBookings  */}
                  <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {confirmedBookings.map((booking) => (
                      <BookingItem
                        key={booking.id}
                        booking={JSON.parse(JSON.stringify(booking))}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden lg:block xl:max-w-2xl">
            {/* TODO: componentizar os recomendados */}
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
              recomendados
            </h2>

            <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="px-5 py-5 lg:px-32">
        {/* Busca rápida mobile */}
        <div className="mt-6 flex gap-3 overflow-x-scroll lg:hidden [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} variant="secondary" asChild>
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner mobile */}
        <div className="relative mt-6 h-[150px] w-full md:hidden">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamentos */}
        <div className="md:hidden">
          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                agendamentos
              </h2>

              <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Recomendados */}
        <div className="mt-10 lg:hidden">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            recomendados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        {/* Populares */}
        <div className="mt-10">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            populares
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>

        {/* Mais visitados */}
        {/* TODO: Pegar do banco os mais visitados */}
        <div className="mt-10 hidden lg:block">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            mais visitados
          </h2>

          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </div>
      </div>
    </div>

    //   <div>
    //   <Header />
    //   <div className="relative h-[463px] w-full">
    //     <Image
    //       src={bannerImage}
    //       alt="Background"
    //       fill
    //       className="object-cover"
    //     />
    //   </div>
    //   <div className="p-5">
    //     <div className="flex min-h-[300px] flex-col gap-4 lg:flex-row lg:gap-8">
    //       <div className="lg:w-6/12 lg:pr-32">
    //         <h2 className="text-xl font-bold">
    //           Olá, {session?.user ? session.user.name : "bem vindo."}
    //         </h2>
    //         <p>
    //           <span className="capitalize">
    //             {format(new Date(), "EEEE, dd ", { locale: ptBR })}
    //           </span>
    //           de
    //           <span className="capitalize">
    //             {format(new Date(), " MMMM", { locale: ptBR })}
    //           </span>
    //         </p>
    //         <div className="mt-6">
    //           <Search />
    //         </div>
    //       </div>
    //       <div className="mt-6 flex gap-3 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
    //         {quickSearchOptions.map((option) => (
    //           <Button key={option.title} variant="secondary" asChild>
    //             <Link href={`/barbershops?service=${option.title}`}>
    //               <Image
    //                 src={option.imageUrl}
    //                 width={16}
    //                 height={16}
    //                 alt={option.title}
    //               />
    //               {option.title}
    //             </Link>
    //           </Button>
    //         ))}
    //       </div>

    //       <div className="relative mt-6 h-[150px] w-full md:hidden">
    //         <Image
    //           alt="Agende nos melhores com FSW Barber"
    //           src="/banner-01.png"
    //           fill
    //           className="rounded-xl object-cover"
    //         />
    //       </div>

    //       {confirmedBookings.length > 0 && (
    //         <>
    //           <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
    //             agendamentos
    //           </h2>

    //           <div className="flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
    //             {confirmedBookings.map((booking) => (
    //               <BookingItem
    //                 key={booking.id}
    //                 booking={JSON.parse(JSON.stringify(booking))}
    //               />
    //             ))}
    //           </div>
    //         </>
    //       )}

    //       <div className="w-6/12">
    //         <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
    //           recomendados
    //         </h2>

    //         <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
    //           {barbershops.map((barbershop) => (
    //             <BarbershopItem key={barbershop.id} barbershop={barbershop} />
    //           ))}
    //         </div>
    //       </div>
    //     </div>

    //     <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
    //       populares
    //     </h2>

    //     <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
    //       {popularBarbershops.map((barbershop) => (
    //         <BarbershopItem key={barbershop.id} barbershop={barbershop} />
    //       ))}
    //     </div>
    //   </div>
    // </div>
  )
}

export default Home
