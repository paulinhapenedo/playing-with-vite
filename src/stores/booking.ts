import { create } from "zustand";

import { BookReservationProps, ReservationData } from "@/types";

interface StateProps {
  bookings: BookReservationProps[];
  confirmReservation: (reservationData: ReservationData) => void;
  cancelReservation: (id: number) => void;
  editReservation: (reservationData: BookReservationProps) => void;
}

export const useBookingStore = create<StateProps>((set, get) => ({
  bookings: [],
  confirmReservation: (reservationData) => {
    const currentBookings = get().bookings;
    const { id, ...dateRange } = reservationData;

    // check if there's already bookings for a property
    const getBookingById = currentBookings.filter(
      (booking) => booking.id === id,
    );

    if (getBookingById.length) {
      getBookingById[0].reservations.push({ ...dateRange });

      return set(() => ({ bookings: currentBookings }));
    }

    // adds a new property
    return set((state) => ({
      bookings: [...state.bookings, { id, reservations: [{ ...dateRange }] }],
    }));
  },
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
