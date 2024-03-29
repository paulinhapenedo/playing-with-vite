import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useBookingStore } from "@/stores/booking";

export const useDeleteReservation = () => {
  const [openModal, setOpenModal] = useState(false);
  const { cancelReservation } = useBookingStore();

  const handleDelete = useCallback(
    (reservationId: string) => {
      cancelReservation(reservationId);

      toast.success("Booking cancelled.");

      setOpenModal(false);
    },
    [cancelReservation, setOpenModal],
  );

  return {
    handleDelete,
    openModal,
    setOpenModal,
  };
};
