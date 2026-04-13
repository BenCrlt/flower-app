import { format, isValid } from "date-fns";
import { fr } from "date-fns/locale";

export const appDateLocale = fr;

const DEFAULT_FORMAT = "Pp";

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
