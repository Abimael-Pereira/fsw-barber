import { Button } from "./ui/button"
import { useBookings } from "../_hooks/useBookings"
import { LoadingSpinner } from "./ui/loading"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Booking } from "@prisma/client"

interface BookingCanceledButtonProps {
  booking: Pick<Booking, "id">
  onClick?: () => void
}

const BookingCanceledButton = ({
  onClick,
  booking,
}: BookingCanceledButtonProps) => {
  const { deleteBooking, isPending } = useBookings()

  const handleCancelBooking = async () => {
    await deleteBooking(booking.id)
    // Fechar apenas se a operação foi bem-sucedida
    // (o hook já trata os toasts de sucesso/erro)
    if (onClick) {
      onClick()
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Cancelar reserva
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle>Cancelar reserva</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja cancelar essa reserva? Essa ação não
            pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full">
              Voltar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleCancelBooking}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Cancelando...</span>
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingCanceledButton
