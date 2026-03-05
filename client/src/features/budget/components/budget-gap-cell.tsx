import { LineTypeEnum } from "@/generated/graphql";
import {
  formatGapForCell,
  getGapBetweenRealAndPrevisionnal,
  getTextColorForGapFromLineType,
} from "../utils";

interface Props {
  lineType: LineTypeEnum;
  realAmount: number | null;
  previsionnalAmount: number;
  inPercent?: boolean;
}

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

  const textColor = getTextColorForGapFromLineType(lineType, gap);

  return (
    <div className={`text-right font-medium ${textColor}`}>
      {formatGapForCell(gap, inPercent)}
    </div>
  );
}
