import { StrictDateRange } from "@/components/date-picker";
import { format, isValid, parse } from "date-fns";
import { fr } from "date-fns/locale";

/** Accepte par ex. `9:30`, `09:30`, `14:05`. */
export function normalizeTimeInput(timeStr: string): string {
  const t = timeStr.trim();
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(t);
  if (!m) {
    throw new Error("Heure invalide");
  }
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (hh > 23 || mm > 59) {
    throw new Error("Heure invalide");
  }
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/** Combine date + heure locales en ISO UTC pour l’API. */
export function dateAndTimeToIso(dateStr: string, timeStr: string): string {
  const dPart = dateStr.trim();
  const tNorm = normalizeTimeInput(timeStr);
  const d = parse(`${dPart}T${tNorm}`, "yyyy-MM-dd'T'HH:mm", new Date());
  if (Number.isNaN(d.getTime())) {
    throw new Error("Date ou heure invalide");
  }
  return d.toISOString();
}

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
