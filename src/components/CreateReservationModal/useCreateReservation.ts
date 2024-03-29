import { zodResolver } from "@hookform/resolvers/zod";
import {
  addDays,
  areIntervalsOverlapping,
  differenceInCalendarDays,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { useBookingStore } from "@/stores/booking";
import { BookingPayload, Property } from "@/types";

const formSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const useCreateReservation = (property: Property) => {
  const [openModal, setOpenModal] = useState(false);
  const { confirmReservation, bookings } = useBookingStore();

  /**
   * checks if we need to disable dates on the calendar
   * because there's a booking with those dates
   */
  const disableDaysWithReservations = useCallback(() => {
    if (!bookings.length) return;

    const getAllReservationsFromProperty = bookings.filter(
      (booking) => booking.propertyId === property.id,
    );

    if (!getAllReservationsFromProperty.length) return;

    const disabledDays = getAllReservationsFromProperty.map((dates) => ({
      from: dates.startDate,
      to: dates.endDate,
    }));

    return disabledDays;
  }, [bookings, property.id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // watching the dates change
  const startDate = form.watch().from;
  const endDate = form.watch().to;
  const hasDates = !!startDate && !!endDate;

  const daysBetweenStartEnd = hasDates
    ? differenceInCalendarDays(endDate, startDate)
    : undefined;
  const daysTotal = daysBetweenStartEnd
    ? property.price * daysBetweenStartEnd
    : null;
  const totalPrice = daysTotal ? daysTotal + property.cleaningFee : undefined;

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
      bookings
        .map((booking) =>
          areIntervalsOverlapping(range, {
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          }),
        )
        .filter(Boolean),
    [bookings],
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
      propertyId: property.id,
      startDate: values.from,
      endDate: values.to,
      reservationId: uuidv4(),
    };

    console.log("payload", payload);

    confirmReservation(payload);
    onCloseModal();

    toast.success("Reservation successful!");
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
  };
};
