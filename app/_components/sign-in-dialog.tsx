import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { signIn } from "next-auth/react"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => {
    signIn("google")
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça Login na plataforma.</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do Google.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant={"outline"}
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o google"
          src="/google.svg"
          height={18}
          width={18}
        />
        Continuar com o Google
      </Button>
    </>
  )
}

export default SignInDialog
