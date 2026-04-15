import { StrictDateRange } from "@/components/date-picker";
import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";

export const appDateLocale = fr;

const DEFAULT_FORMAT = "Pp";

export function formatTimestampToLocaleString(
  value: string,
  formatStr: string = DEFAULT_FORMAT,
): string {
  console.log(value);
  const trimmed = value.trim();
  if (!trimmed) {
    return "—";
  }
  const asNumber = Number(trimmed);
  const date =
    Number.isFinite(asNumber) && /^\d+$/.test(trimmed)
      ? new Date(asNumber)
      : new Date(trimmed);
  if (!isValid(date)) {
    return value;
  }
  return format(date, formatStr, { locale: appDateLocale });
}

export function formatDateRangeToLocaleString(
  dateRange: StrictDateRange,
): string {
  return (
    format(dateRange.from, "dd/MM/yyyy", { locale: appDateLocale }) +
    " - " +
    format(dateRange.to, "dd/MM/yyyy", { locale: appDateLocale })
  );
}
