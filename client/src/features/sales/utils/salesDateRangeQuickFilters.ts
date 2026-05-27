import { DateRangeQuickFilter } from "@/components/date-picker";
import { EditionBaseInfo } from "@/features/edition/EditionContext";
import { parseEditionDateTime } from "@/utils/DateUtils";
import { endOfDay, startOfDay, subDays, subMonths } from "date-fns";

type EditionTimeline = "before" | "during" | "after";

function getEditionTimeline(
  edition: Pick<EditionBaseInfo, "startDate" | "endDate">,
): EditionTimeline {
  const editionStart = parseEditionDateTime(edition.startDate);
  const editionEnd = parseEditionDateTime(edition.endDate);
  if (!editionStart || !editionEnd) {
    return "during";
  }

  const today = startOfDay(new Date());
  const startDay = startOfDay(editionStart);
  const endDay = startOfDay(editionEnd);

  if (today.getTime() < startDay.getTime()) {
    return "before";
  }
  if (today.getTime() > endDay.getTime()) {
    return "after";
  }
  return "during";
}

function getEditionBounds(
  edition: Pick<EditionBaseInfo, "startDate" | "endDate">,
) {
  const editionStart = parseEditionDateTime(edition.startDate);
  const editionEnd = parseEditionDateTime(edition.endDate);

  return {
    start: startOfDay(editionStart ?? new Date(edition.startDate)),
    end: endOfDay(editionEnd ?? new Date(edition.endDate)),
  };
}

function buildLastMonthsFilter(
  months: number,
  editionEnd: Date,
  ended: boolean,
): DateRangeQuickFilter {
  const label = months === 1 ? "1 dernier mois" : `${months} derniers mois`;

  const from = ended
    ? subMonths(editionEnd, months)
    : subMonths(new Date(), months);
  const to = ended ? editionEnd : new Date();

  return {
    id: `last-${months}-months`,
    label,
    title: ended
      ? `${months} mois se terminant à la date de fin de l'édition`
      : `${months} mois se terminant aujourd'hui`,
    getRange: () => ({ from, to }),
  };
}

export function buildSalesDateRangeQuickFilters(
  edition: Pick<EditionBaseInfo, "startDate" | "endDate">,
): DateRangeQuickFilter[] {
  const timeline = getEditionTimeline(edition);
  const { start: editionStart, end: editionEnd } = getEditionBounds(edition);

  const ended = timeline === "after";

  return [
    {
      id: "edition-span",
      label: ended ? "Jour de l'édition" : "Dernière 24h",
      getRange: () => ({
        from: ended ? editionStart : subDays(new Date(), 1),
        to: ended ? editionEnd : new Date(),
      }),
    },
    buildLastMonthsFilter(1, editionEnd, ended),
    buildLastMonthsFilter(3, editionEnd, ended),
    buildLastMonthsFilter(6, editionEnd, ended),
  ];
}
