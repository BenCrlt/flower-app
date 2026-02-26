import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { formatGapForCell, getGapBetweenRealAndPrevisionnal } from "../utils";

interface Props {
  lineType: BudgetLinesBudgetLineTypeInput;
  realAmount: number | null;
  previsionnalAmount: number;
  inPercent?: boolean;
}

const getCellTextColorFromLineType = (
  lineType: BudgetLinesBudgetLineTypeInput,
  gap: number | null,
): string => {
  if (gap === null) return "";
  switch (lineType) {
    case BudgetLinesBudgetLineTypeInput.Income:
      return gap > 0 ? "text-green-600" : "text-red-600";
    case BudgetLinesBudgetLineTypeInput.Expense:
      return gap > 0 ? "text-red-600" : "text-green-600";
    default:
      return "";
  }
};

export function BudgetGapCell({
  lineType,
  realAmount,
  previsionnalAmount,
  inPercent,
}: Props) {
  const gap = getGapBetweenRealAndPrevisionnal(
    realAmount,
    previsionnalAmount,
    inPercent,
  );

  const textColor = getCellTextColorFromLineType(lineType, gap);

  return (
    <div className={`text-right font-medium ${textColor}`}>
      {formatGapForCell(gap, inPercent)}
    </div>
  );
}
