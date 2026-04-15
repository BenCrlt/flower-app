"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { Button } from "./ui/button";

export type StrictDateRange = {
  from: Date;
  to: Date;
};

interface Props {
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  maxDate?: Date;
  presets?: {
    label: string;
    subDaysCount: number;
    startDate?: Date;
  }[];
}

export function DateRangePicker({
  dateRange,
  handleSelectDateRange,
  maxDate,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const onSelectDateRange = (dateRange: DateRange) => {
    if (!dateRange.from || !dateRange.to) {
      return;
    }
    handleSelectDateRange({
      from: dateRange.from,
      to: dateRange.to,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          variant="ghost"
          size="icon-xs"
          aria-label="Sélectionner une période"
        >
          <CalendarIcon />
          <span className="sr-only">Sélectionner une période</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="range"
          defaultMonth={dateRange.from}
          selected={dateRange}
          onSelect={onSelectDateRange}
          numberOfMonths={2}
          disabled={(date) =>
            date > new Date() ||
            date < new Date("1900-01-01") ||
            (!!maxDate && date > maxDate)
          }
          required
        />
      </PopoverContent>
    </Popover>
  );
}
