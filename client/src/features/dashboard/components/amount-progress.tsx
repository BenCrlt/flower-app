import { Progress } from "@/components/ui/progress";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import {
  formatGap,
  getGapBetweenRealAndPrevisionnal,
  getTextColorForGapFromLineType,
} from "@/features/budget/utils";
import { LineTypeEnum } from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";

interface Props {
  value: number | null;
  max: number;
  title: string;
  lineType: LineTypeEnum;
}

export function AmountProgress({ value, max, title, lineType }: Props) {
  const progress = max > 0 && !!value ? Math.min((value / max) * 100, 100) : 0;
  const gapInPercent =
    value !== 0 ? getGapBetweenRealAndPrevisionnal(value, max, true) : null;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <TypographyH2>{title}</TypographyH2>
        {gapInPercent !== null && (
          <span
            className={getTextColorForGapFromLineType(lineType, gapInPercent)}
          >
            {`${formatGap(gapInPercent, true, 0)} ${gapInPercent > 0 ? "↑" : "↓"}`}
          </span>
        )}
      </div>

      <Progress className="h-5" value={progress} />
      <div className="flex justify-between">
        <TypographyH3>
          {value !== null ? formatPriceToEuros(value) : "-"}
        </TypographyH3>
        <TypographyH3 className="opacity-80">
          {formatPriceToEuros(max)}
        </TypographyH3>
      </div>
    </div>
  );
}
