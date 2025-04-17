import { CircleUserRound, LogInIcon } from "lucide-react"
import SignInDialog from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Session } from "next-auth"

interface LoginButtonProps {
  data: Session | null
}

const LoginButton = ({ data }: LoginButtonProps) => {
  return (
    <div className="flex items-center gap-3 border-b border-solid py-5 md:border-none">
      {data?.user ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={data.user.image ?? ""} />
          </Avatar>

          <div className="">
            <p className="text-sm font-bold">{data.user.name}</p>
            <p className="text-xs font-light">{data.user.email}</p>
          </div>
        </div>
      ) : (
        <>
          <Dialog>
            <div className="flex w-full items-center justify-between">
              <h2 className="font-bold md:hidden">Olá, faça seu login!</h2>

              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 px-4 py-2 text-sm md:rounded-xl md:px-6 md:py-3 md:text-base">
                  <CircleUserRound className="hidden h-4 w-4 md:inline md:h-5 md:w-5" />
                  <span className="hidden text-sm md:inline">Perfil</span>
                  <LogInIcon className="h-4 w-4 md:hidden" />
                </Button>
              </DialogTrigger>
            </div>

            <DialogContent className="w-[90%] max-w-md">
              <SignInDialog />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}

export default LoginButton
