import { cn } from "@/lib/utils";
import { formatPriceToEuros } from "@/utils/PriceUtils";

export function RowPrice({
  amount,
  className,
}: {
  amount: number | null;
  className?: string;
}) {
  const formatted = amount !== null ? formatPriceToEuros(amount) : "-";
  return (
    <div className={cn("text-right font-medium", className)}>{formatted}</div>
  );
}
