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
      <CardContent className="flex h-[96px] flex-row items-center justify-between p-5 lg:px-32">
        <Link href={"/"}>
          <Image src="/logo.png" height={18} width={120} alt="Logo" />
        </Link>
        <div className="w-[583px] p-11">{isHomePage ? null : <Search />}</div>
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
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href={"/bookings"}>
              <CalendarIcon />
              <span className="text-sm">Agendamentos</span>
            </Link>
          </Button>
          <LoginButton data={data} />
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
