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
  return `${gap >= 0 ? "+" : ""}${gap.toFixed(2)}${inPercent ? "%" : ""}`;
};
