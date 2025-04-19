import { toast } from "sonner"
import { deleteBooking } from "../_actions/delete-booking"
import { Button } from "./ui/button"
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
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      if (onClick) {
        onClick()
      }
      toast.success("Reserva cancelada com sucesso")
    } catch (error) {
      toast.error("Erro ao cancelar a reserva")
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
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BookingCanceledButton
