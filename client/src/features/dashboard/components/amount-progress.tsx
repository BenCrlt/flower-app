import { Progress } from "@/components/ui/progress";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import { formatPriceToEuros } from "@/utils/PriceUtils";

interface Props {
  value: number;
  max: number;
  title: string;
}

export function AmountProgress({ value, max, title }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <TypographyH2>{title}</TypographyH2>
      <Progress className="h-5" value={value} max={max} />
      <div className="flex justify-between">
        <TypographyH3>{formatPriceToEuros(0)}</TypographyH3>
        <TypographyH3 className="opacity-80">
          {formatPriceToEuros(max)}
        </TypographyH3>
      </div>
    </div>
  );
}
