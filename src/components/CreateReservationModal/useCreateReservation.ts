import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, differenceInCalendarDays } from "date-fns";
  addDays,
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useBookingStore } from "@/stores/booking";
import { Property, ReservationData } from "@/types";

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
  const disableDaysWithReservations = useMemo(() => {
    if (!bookings.length) return;

    const getReservationsById = bookings.filter(
      (booking) => booking.id === property.id,
    );

    if (!getReservationsById.length) return;

    const disabledDays = getReservationsById[0].reservations.map((dates) => ({
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
