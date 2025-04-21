"use client"

import React from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { CalendarIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import LoginButton from "./login-button"
import { useSession } from "next-auth/react"
import Search from "./search"

interface HeaderProps {
  isHomePage?: boolean
}

const Header = ({ isHomePage }: HeaderProps) => {
  const { data } = useSession()

  return (
    <Card>
      <CardContent className="flex h-[96px] flex-row items-center justify-between p-5 xl:px-32">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            height={22}
            width={130}
            alt="Logo"
            className="min-w-[130px] max-w-[130px]"
          />
        </Link>
        <div className="hidden w-full p-11 lg:block">
          {isHomePage ? null : <Search />}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>
        <div className="hidden items-center md:flex md:gap-3">
          {data?.user && (
            <Button className="justify-start gap-2" variant="ghost" asChild>
              <Link href={"/bookings"}>
                <CalendarIcon />
                <span className="text-sm">Agendamentos</span>
              </Link>
            </Button>
          )}
          <LoginButton data={data} />
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
