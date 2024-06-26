import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formatPriceToCurrency } from "@/lib/currency";

import { TODAY } from "@/lib/date";
import { Pencil } from "lucide-react";
import { strings } from "./strings";
import { useEditReservation } from "./useEditReservation";

interface EditReservationModalProps {
  reservationId: string;
}

export function EditReservationModal({
  reservationId,
}: EditReservationModalProps) {
  const {
    form,
    onSubmit,
    daysBetweenStartEnd,
    daysTotal,
    totalPrice,
    openModal,
    onModalOpenChange,
    onCloseModal,
    disableDaysWithReservations,
    currentPropertyData,
  } = useEditReservation(reservationId);

  return (
    <Dialog open={openModal} onOpenChange={onModalOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{strings.modalTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-3 mb-6">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>{strings.formLabel.startDate}</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        fromDate={TODAY}
                        required
                        disabled={disableDaysWithReservations()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>{strings.formLabel.endDate}</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        fromDate={form.watch().from ?? TODAY}
                        required
                        disabled={disableDaysWithReservations()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {daysTotal && (
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <span className="font-semibold">
                      {formatPriceToCurrency(currentPropertyData.price)}{" "}
                    </span>
                    {strings.totalNights(daysBetweenStartEnd!)}
                  </p>
                  <p>{formatPriceToCurrency(daysTotal)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {strings.cleaningFee}
                  </p>
                  <p>
                    {formatPriceToCurrency(currentPropertyData.cleaningFee)}
                  </p>
                </div>
                <div className="flex justify-between items-center my-4 font-semibold">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {strings.totalBeforeTaxes}
                  </p>
                  <p>{formatPriceToCurrency(totalPrice!)}</p>
                </div>
              </div>
            )}
            <DialogFooter className="border-t pt-4 gap-3 md:gap-0">
              <Button variant="outline" onClick={onCloseModal} type="button">
                {strings.cta.seconday}
              </Button>
              <Button type="submit" disabled={!daysTotal}>
                {strings.cta.primary}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
