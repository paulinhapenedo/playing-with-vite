import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DayPickerSingleProps } from "react-day-picker";
import { FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CALENDAR_LIMIT } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DatePickerProps = Omit<DayPickerSingleProps, "mode"> & FieldValues;

export function DatePicker({
  value,
  onChange,
  ...datePickerProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "LLL dd, y") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="single"
          selected={value}
          onSelect={onChange}
          onDayClick={() => setOpen(false)}
          toMonth={CALENDAR_LIMIT}
          {...datePickerProps}
        />
      </PopoverContent>
    </Popover>
  );
}
