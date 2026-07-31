"use client";

import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateRangeToLocaleString } from "@/utils/DateUtils";
import { DateRange } from "react-day-picker";
import { Button } from "./ui/button";

export type StrictDateRange = {
  from: Date;
  to: Date;
};

export type DateRangeQuickFilter = {
  id: string;
  label: string;
  getRange: () => StrictDateRange;
  disabled?: boolean;
  title?: string;
};

interface Props {
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  maxDate?: Date;
  quickFilters?: DateRangeQuickFilter[];
  disableFutureDates?: boolean;
}

export function DateRangePicker({
  dateRange,
  handleSelectDateRange,
  maxDate,
  quickFilters,
  disableFutureDates = true,
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

  const applyQuickFilter = (filter: DateRangeQuickFilter) => {
    if (filter.disabled) {
      return;
    }
    handleSelectDateRange(filter.getRange());
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          variant="outline"
          aria-label="Sélectionner une période"
          className="w-fit"
        >
          <CalendarIcon />
          {formatDateRangeToLocaleString(dateRange)}
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
            (disableFutureDates && date > new Date()) ||
            date < new Date("1900-01-01") ||
            (!!maxDate && date > maxDate)
          }
          required
        />
        {quickFilters?.length ? (
          <div className="flex max-w-[min(100vw-2rem,42rem)] flex-wrap gap-2 border-t bg-muted/30 p-3">
            {quickFilters.map((filter) => (
              <Button
                key={filter.id}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto min-h-7 max-w-full shrink whitespace-normal rounded-full px-3 py-1.5 text-center text-xs leading-snug font-normal"
                disabled={filter.disabled}
                title={filter.title}
                onClick={() => applyQuickFilter(filter)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
