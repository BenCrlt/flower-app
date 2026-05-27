import { StrictDateRange } from "@/components/date-picker";
import { format, isValid, parse } from "date-fns";
import { fr } from "date-fns/locale";

export const appDateLocale = fr;

const DEFAULT_FORMAT = "Pp";

/** Parse les dates d'édition renvoyées par l'API (ISO, yyyy-MM-dd, d/M/yyyy, timestamp). */
export function parseEditionDateTime(raw: string | number): Date | null {
  if (typeof raw === "number") {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const s = raw?.trim() ?? "";
  if (!s) {
    return null;
  }

  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) {
    const parsed = parse(s, "d/M/yyyy", new Date());
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    const parsed = parse(s, "yyyy-MM-dd", new Date());
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  const numeric = /^\d+$/.test(s);
  const date = numeric ? new Date(Number(s)) : new Date(s);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatTimestampToLocaleString(
  value: string,
  formatStr: string = DEFAULT_FORMAT,
): string {
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
