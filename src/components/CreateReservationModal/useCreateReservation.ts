import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FIVE_DAYS_FROM_TODAY, TODAY } from "@/lib/date";
import { useBookingStore } from "@/stores/booking";
import { Property, ReservationData } from "@/types";
import { addDays, differenceInCalendarDays } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Matcher } from "react-day-picker";

const formSchema = z.object({
  from: z.date(),
  to: z.date(),
});

export const useCreateReservation = (property: Property) => {
  const [openModal, setOpenModal] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      from: TODAY, // sensible defaults
      to: FIVE_DAYS_FROM_TODAY, // sensible defaults
    },
  });

  const { confirmReservation, bookings } = useBookingStore();

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!hasDates) {
      return;
    }

    const payload: ReservationData = {
      id: property.id,
      startDate: values.from,
      endDate: values.to,
    };

    confirmReservation(payload);
    onCloseModal();
  };

  const disableDaysWithReservations = useMemo(() => {
    if (!bookings.length) return;

    const getReservationsById = bookings.filter(
      (booking) => booking.id === property.id,
    );

    if (!getReservationsById.length) return;

    const disabledDays: Matcher[] = getReservationsById[0].reservations.map(
      (dates) => ({
        from: dates.startDate,
        to: dates.endDate,
      }),
    );

    return disabledDays;
  }, [bookings, property.id]);

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
