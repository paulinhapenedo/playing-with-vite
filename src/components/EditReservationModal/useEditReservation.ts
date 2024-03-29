import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { propertiesMock } from "@/api/properties";
import { useBookingStore } from "@/stores/booking";
import { BookingPayload } from "@/types";

const formSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const useEditReservation = (reservationId: string) => {
  const [openModal, setOpenModal] = useState(false);
  const { editReservation, bookings } = useBookingStore();

  const getReservationById = bookings.filter(
    (booking) => booking.reservationId === reservationId,
  )[0];

  const getAllBookingsForProperty = bookings.filter(
    (booking) =>
      booking.propertyId === getReservationById.propertyId &&
      booking.reservationId !== reservationId,
  );

  const currentPropertyData = propertiesMock.filter(
    (property) => property.id === getReservationById.propertyId,
  )[0];

  /**
   * checks if we need to disable dates on the calendar
   * because there's a booking with those dates
   */
  const disableDaysWithReservations = useCallback(() => {
    if (!bookings.length) return;

    const disabledDays = getAllBookingsForProperty.map((dates) => ({
      from: dates.startDate,
      to: dates.endDate,
    }));

    return disabledDays;
  }, [bookings, getAllBookingsForProperty]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      from: getReservationById.startDate,
      to: getReservationById.endDate,
    },
  });

  // watching the dates change
  const startDate = form.watch().from;
  const endDate = form.watch().to;
  const hasDates = !!startDate && !!endDate;

  const daysBetweenStartEnd = hasDates
    ? differenceInCalendarDays(endDate, startDate)
    : undefined;
  const daysTotal = daysBetweenStartEnd
    ? currentPropertyData.price * daysBetweenStartEnd
    : null;
  const totalPrice = daysTotal
    ? daysTotal + currentPropertyData.cleaningFee
    : undefined;

  // handles selecting a startDate that's after the endingDate
  // by resetting the endDate to the next day
  useEffect(() => {
    if (!daysBetweenStartEnd) return;

    if (daysBetweenStartEnd <= 0) {
      form.setValue("to", addDays(startDate, 1));
    }
  }, [daysBetweenStartEnd, startDate, form]);

  const onCloseModal = useCallback(() => {
    form.reset();
    setOpenModal(false);
  }, [form]);

  const onModalOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setOpenModal(true);
        return;
      }

      onCloseModal();
    },
    [onCloseModal],
  );

  const checkIfConflictsWithOtherConfigs = useCallback(
    (range: { start: Date; end: Date }) =>
      getAllBookingsForProperty
        .map((booking) =>
          areIntervalsOverlapping(range, {
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          }),
        )
        .filter(Boolean),
    [getAllBookingsForProperty],
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!hasDates) {
      return;
    }

    const hasConflicts = checkIfConflictsWithOtherConfigs({
      start: values.from,
      end: values.to,
    });

    if (hasConflicts.length) {
      toast.error(
        "The selected days conflicts with another reservation. Please check the values.",
      );
      return;
    }

    const payload: BookingPayload = {
      ...getReservationById,
      startDate: values.from,
      endDate: values.to,
    };

    editReservation(payload);
    onCloseModal();

    toast.success("Reservation updated successfully!");
  };

  return {
    onSubmit,
    form,
    totalPrice,
    daysTotal,
    daysBetweenStartEnd,
    openModal,
    onModalOpenChange,
    onCloseModal,
    disableDaysWithReservations,
    currentPropertyData,
  };
};
