import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/booking";
import { BookReservationProps } from "@/types";

export function ReservationList({ id }: Pick<BookReservationProps, "id">) {
  const { getReservationsByPropertyId } = useBookingStore();
  const bookingByProperty = getReservationsByPropertyId(id);

  const renderList = useMemo(
    () =>
      bookingByProperty.map((range) => (
        <li className="list-none [&>li]:mt-2 flex flex-nowrap justify-between items-center w-full py-2 md:py-3">
          <p className="text-sm leading-7">
            {format(range.startDate, "dd/MM/yy")}-
            {format(range.endDate, "dd/MM/yy")}
          </p>
          <div className="flex gap-2">
            <Button variant="outline">
              <Pencil size={16} />
            </Button>
            <Button variant="destructive">
              <Trash size={16} />
            </Button>
          </div>
        </li>
      )),
    [bookingByProperty],
  );

  return (
    <div className="flex flex-col w-full">
      <ol className="divide-y-2">{renderList}</ol>
    </div>
  );
}
