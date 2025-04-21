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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"

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
      <Header isHomePage={true} />
      {/* HERO COM IMAGEM DE FUNDO */}
      <div className="relative mt-6 w-full md:mt-0 md:h-[463px]">
        <Image
          src="/bg-mainpage.jpeg"
          alt="Background"
          fill
          className="hidden object-cover object-top grayscale md:block"
        />
        <div className="absolute inset-0 hidden bg-black/70 md:block" />

        <div className="relative z-10 flex h-full items-center justify-center px-5">
          <div className="w-full md:max-w-2xl">
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

            <div className="mt-6 hidden md:block 2xl:mr-32">
              <Search />
              {confirmedBookings.length > 0 && (
                <>
                  <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    agendamentos
                  </h2>

                  <div className="flex gap-3 md:w-[93%]">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        {confirmedBookings.map((booking) => (
                          <CarouselItem key={booking.id}>
                            <BookingItem
                              onClickHomePage={true}
                              booking={JSON.parse(JSON.stringify(booking))}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="md:hidden" />
                      <CarouselNext />
                    </Carousel>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden 2xl:block 2xl:max-w-2xl">
            <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
              recomendados
            </h2>

            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {barbershops.map((barbershop) => (
                  <CarouselItem key={barbershop.id} className="basis-1/3">
                    <BarbershopItem barbershop={barbershop} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="px-5 py-5 xl:px-32">
        {/* Busca rápida mobile */}
        <div className="mt-6 flex gap-3">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {quickSearchOptions.map((option) => (
                <CarouselItem key={option.title} className="basis-auto">
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
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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

              <div className="w-[92%]">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {confirmedBookings.map((booking) => (
                      <CarouselItem key={booking.id}>
                        <BookingItem
                          onClickHomePage={true}
                          booking={JSON.parse(JSON.stringify(booking))}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselNext />
                </Carousel>
              </div>
            </>
          )}
        </div>

        {/* Recomendados */}
        <div className="mt-10 2xl:hidden">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            recomendados
          </h2>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {barbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-auto">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:block" />
            <CarouselNext className="hidden lg:block" />
          </Carousel>
        </div>

        {/* Populares */}
        <div className="mt-10">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            populares
          </h2>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {popularBarbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-auto">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:block" />
            <CarouselNext className="hidden lg:block" />
          </Carousel>
        </div>

        {/* Mais visitados */}
        <div className="mt-10 hidden lg:block">
          <h2 className="mb-3 text-xs font-bold uppercase text-gray-400">
            mais visitados
          </h2>

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {popularBarbershops.map((barbershop) => (
                <CarouselItem key={barbershop.id} className="basis-auto">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Home
