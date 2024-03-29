import { format } from "date-fns";
import { useMemo } from "react";

import { useBookingStore } from "@/stores/booking";
import { DeleteReservationModal } from "../DeleteReservationModal";

interface ReservationListProps {
  propertyId: number;
}

export function ReservationList({ propertyId }: ReservationListProps) {
  const { bookings } = useBookingStore();

  const getAllReservationsForProperty = bookings.filter(
    (booking) => booking.propertyId === propertyId,
  );

  const renderList = useMemo(
    () =>
      getAllReservationsForProperty.map((data) => (
        <li
          key={data.reservationId}
          className="list-none [&>li]:mt-2 flex flex-nowrap justify-between items-center w-full py-2 md:py-3"
        >
          <p className="text-sm leading-7">
            {format(data.startDate, "dd/MM/yy")}-
            {format(data.endDate, "dd/MM/yy")}
          </p>
          <div className="flex gap-2">
            {/* <EditReservationModal id={id} /> */}
            <DeleteReservationModal reservationId={data.reservationId} />
          </div>
        </li>
      )),
    [getAllReservationsForProperty],
  );

  return (
    <div className="flex flex-col w-full">
      <ol className="divide-y-2">{renderList}</ol>
    </div>
  );
}
