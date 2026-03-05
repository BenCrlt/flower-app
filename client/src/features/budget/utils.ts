import { LineTypeEnum } from "@/generated/graphql";

export const getBudgetLineTypeString = (lineType: LineTypeEnum) => {
  switch (lineType) {
    case LineTypeEnum.Income:
      return "recette";
    case LineTypeEnum.Expense:
      return "dépense";
    default:
      return "autre";
  }
};

export const getGapBetweenRealAndPrevisionnal = (
  realAmount: number | null,
  previsionnalAmount: number,
  inPercent = false,
): number | null => {
  if (realAmount === null) {
    return null;
  }
  if (inPercent) {
    return (realAmount / previsionnalAmount - 1) * 100;
  }
  return realAmount - previsionnalAmount;
};

export const formatGapForCell = (gap: number | null, inPercent = false) => {
  if (gap === null) {
    return "-";
  }
  return formatGap(gap, inPercent);
};

export const formatGap = (gap: number, inPercent = false, fixedDigits = 2) =>
  `${gap >= 0 ? "+" : ""}${gap.toFixed(fixedDigits)}${inPercent ? "%" : ""}`;

export const getTextColorForGapFromLineType = (
  lineType: LineTypeEnum,
  gap: number | null,
): string => {
  if (gap === null) return "";
  switch (lineType) {
    case LineTypeEnum.Income:
      return gap > 0 ? "text-green-600" : "text-red-600";
    case LineTypeEnum.Expense:
      return gap > 0 ? "text-red-600" : "text-green-600";
    default:
      return "";
  }
};
