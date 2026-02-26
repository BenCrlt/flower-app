import { formatPriceToEuros } from "@/utils/PriceUtils";

export function RowPrice({ amount }: { amount: number | null }) {
  const formatted = amount !== null ? formatPriceToEuros(amount) : "-";
  return <div className="text-right font-medium">{formatted}</div>;
}
