import { create } from "zustand";

import { BookingPayload } from "@/types";
interface StateProps {
  bookings: BookingPayload[];
  confirmReservation: (payload: BookingPayload) => void;
  cancelReservation: (reservationId: string) => void;
  editReservation: (payload: BookingPayload) => void;
}

export const useBookingStore = create<StateProps>((set, get) => ({
  bookings: [],
  confirmReservation: (payload) =>
    set((state) => ({
      bookings: [...state.bookings, payload],
    })),
  cancelReservation: (id) =>
    set((state) => ({
      bookings: state.bookings.filter(
        (booking) => booking.reservationId !== id,
      ),
    })),
  editReservation: (payload) => {
    const currentBookings = get().bookings;

    // find booking by id
    const updatedBookings = currentBookings.map((booking) => {
      if (booking.reservationId === payload.reservationId) {
        return {
          ...payload,
        };
      }

      return booking;
    });

    set(() => ({
      bookings: updatedBookings,
    }));
  },
}));
