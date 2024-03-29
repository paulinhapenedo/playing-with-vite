import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogClose } from "@radix-ui/react-dialog";
import { strings } from "./strings";
import { useDeleteReservation } from "./useDeleteReservation";

interface DeleteReservationModalProps {
  reservationId: string;
}

export function DeleteReservationModal({
  reservationId,
}: DeleteReservationModalProps) {
  const { handleDelete, openModal, setOpenModal } = useDeleteReservation();

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{strings.modalTitle}</DialogTitle>
          <DialogDescription>{strings.modalDescription}</DialogDescription>
          <DialogFooter className="border-t pt-4 gap-3 md:gap-0">
            <DialogClose asChild>
              <Button variant="outline">{strings.cta.secondary}</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => handleDelete(reservationId)}
            >
              {strings.cta.primary}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
