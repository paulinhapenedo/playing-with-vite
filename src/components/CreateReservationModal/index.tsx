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
import { Property } from "@/types";

import { TODAY } from "@/lib/date";
import { strings } from "./strings";
import { useCreateReservation } from "./useCreateReservation";

interface CreateReservationModalProps {
  property: Property;
}

export function CreateReservationModal({
  property,
}: CreateReservationModalProps) {
  const {
    form,
    onSubmit,
    daysBetweenStartEnd,
    daysTotal,
    totalPrice,
    openModal,
    onModalOpenChange,
    onCloseModal,
  } = useCreateReservation(property);

  return (
    <Dialog open={openModal} onOpenChange={onModalOpenChange}>
      <DialogTrigger asChild>
        <Button>{strings.modalTrigger}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{strings.modalTitle}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-between gap-3">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel>Checkin</FormLabel>
                    <FormControl>
                      <DatePicker {...field} fromDate={TODAY} required />
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
                    <FormLabel>Checkout</FormLabel>
                    <FormControl>
                      <DatePicker
                        {...field}
                        fromDate={form.watch().from ?? TODAY}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {daysTotal && (
              <>
                <div className="flex justify-between items-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {formatPriceToCurrency(property.price)}x
                    {daysBetweenStartEnd}
                  </p>
                  <p>{formatPriceToCurrency(daysTotal)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Cleaning fee:
                  </p>
                  <p>{formatPriceToCurrency(property.cleaningFee)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Total before taxes:
                  </p>
                  <p>{formatPriceToCurrency(totalPrice!)}</p>
                </div>
              </>
            )}
            <DialogFooter className="border-t pt-4 gap-3 md:gap-0">
              <Button variant="outline" onClick={onCloseModal}>
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
