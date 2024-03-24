import { create } from "zustand";

import { BookReservationProps } from "@/types";

interface StateProps {
  bookings: BookReservationProps[];
  confirmReservation: (reservationData: BookReservationProps) => void;
  cancelReservation: (id: number) => void;
  editReservation: (reservationData: BookReservationProps) => void;
}

export const useBookingStore = create<StateProps>((set, get) => ({
  bookings: [],
  confirmReservation: (reservationData) =>
    set((state) => ({ bookings: [...state.bookings, reservationData] })),
  cancelReservation: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((booking) => booking.id !== id),
    })),
  editReservation: (reservationData) => {
    const currentBookings = get().bookings;

    // find booking by id
    const updatedBookings = currentBookings.filter((booking) => {
      if (booking.id === reservationData.id) {
        return {
          ...booking,
          ...reservationData,
        };
      }

      return booking;
    });

    set(() => ({
      bookings: updatedBookings,
    }));
  },
}));
