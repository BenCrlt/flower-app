import { Progress } from "@/components/ui/progress";
import {
  formatGap,
  getGapBetweenRealAndPrevisionnal,
  getTextColorForGapFromLineType,
} from "@/features/budget/utils";
import { LineType } from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { cn } from "@/lib/utils";

interface Props {
  real: number;
  forecast: number;
  lineType: LineType;
}

function formatSignedEuros(amount: number): string {
  const sign = amount >= 0 ? "+" : "−";
  return `${sign}${formatPriceToEuros(Math.abs(amount))}`;
}

export function ForecastVsActualBlock({ real, forecast, lineType }: Props) {
  const progress =
    forecast > 0 ? Math.min((real / forecast) * 100, 100) : real > 0 ? 100 : 0;
  const gapPercent =
    forecast > 0 ? getGapBetweenRealAndPrevisionnal(real, forecast, true) : null;
  const gapEuro =
    forecast > 0 || real > 0
      ? getGapBetweenRealAndPrevisionnal(real, forecast, false)
      : null;

  return (
    <div className="flex flex-col gap-4">
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground shrink-0">Réel</dt>
          <dd className="font-medium tabular-nums text-right">
            {formatPriceToEuros(real)}
          </dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground shrink-0">Prévisionnel</dt>
          <dd className="font-medium tabular-nums text-right">
            {formatPriceToEuros(forecast)}
          </dd>
        </div>
        <div className="flex justify-between gap-4 items-baseline">
          <dt className="text-muted-foreground shrink-0">Écart</dt>
          <dd
            className={cn(
              "font-medium tabular-nums text-right",
              gapPercent !== null
                ? getTextColorForGapFromLineType(lineType, gapPercent)
                : "",
            )}
          >
            {gapEuro !== null ? (
              <>
                {formatSignedEuros(gapEuro)}
                {gapPercent !== null && (
                  <span className="text-muted-foreground font-normal ms-1">
                    ({formatGap(gapPercent, true, 0)})
                  </span>
                )}
              </>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>
      <Progress className="h-5" value={progress} />
    </div>
  );
}
