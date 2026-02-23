import { formatPriceToEuros } from "@/utils/PriceUtils";

export function RowPrice({ amount }: { amount: number }) {
  const formatted = formatPriceToEuros(amount);
  return <div className="text-right font-medium">{formatted}</div>;
}
