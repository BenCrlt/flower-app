import { BudgetLinesItem, LineType, LineTypeEnum } from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";

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
    if (previsionnalAmount === 0) {
      return realAmount > 0 ? 100 : 0;
    }

    return (realAmount / previsionnalAmount - 1) * 100;
  }

  return realAmount - previsionnalAmount;
};

export const formatGapForCell = (gap: number | null, inPercent = false) => {
  if (gap === null) {
    return "-";
  }
  if (!inPercent) {
    return formatSignedEuros(gap);
  }
  return formatGap(gap, inPercent);
};

export const formatGap = (gap: number, inPercent = false, fixedDigits = 2) =>
  `${gap >= 0 ? "+" : ""}${gap.toFixed(fixedDigits)}${inPercent ? "%" : ""}`;

export const formatSignedEuros = (amount: number): string => {
  const sign = amount >= 0 ? "+" : "-";
  return `${sign}${formatPriceToEuros(Math.abs(amount))}`;
};

export const getTextColorForGapFromLineType = (
  lineType: LineType,
  gap: number | null,
): string => {
  if (gap === null) return "";
  switch (lineType) {
    case LineType.Income:
      return gap > 0 ? "text-green-600" : "text-red-600";
    case LineType.Expense:
      return gap > 0 ? "text-red-600" : "text-green-600";
    default:
      return "";
  }
};

export const getRealCostForBudgetLine = (
  line: Pick<BudgetLinesItem, "lineType" | "realCost" | "salesCount">,
): number | null => {
  if (!line.salesCount && line.lineType === LineType.Income) {
    return null;
  }

  return line.realCost ?? null;
};

export const getEstimatedAmount = (row: {
  estimatedUnitPrice: number;
  estimatedQuantity: number;
}) => row.estimatedUnitPrice * row.estimatedQuantity;

export const isUnplannedLine = (row: {
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  realCost: number | null;
}) => getEstimatedAmount(row) === 0 && (row.realCost ?? 0) > 0;
