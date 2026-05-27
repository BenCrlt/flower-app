import { StrictDateRange } from "@/components/date-picker";
import { differenceInDays } from "date-fns";

/** En dessous de 2 jours calendaires : agrégation horaire sur le graphique. */
export const CHART_HOURLY_MAX_DAY_SPAN = 2;

export function isChartHourlyRange(range: StrictDateRange): boolean {
  return differenceInDays(range.to, range.from) < CHART_HOURLY_MAX_DAY_SPAN;
}
