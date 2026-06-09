import { CategoryBadge } from "@/components/CategoryBadge";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import {
  formatGapForCell,
  getGapBetweenRealAndPrevisionnal,
  getTextColorForGapFromLineType,
} from "../utils";
import { BudgetLineActionsMenu } from "./budget-line-actions-menu";
import { BudgetTableRow } from "./columns";

interface Props {
  row: BudgetTableRow;
  showGapInPercent: boolean;
  onDelete: (id: number) => void;
  onEdit: (row: BudgetTableRow) => void;
}

function formatAmount(amount: number | null): string {
  return amount !== null ? formatPriceToEuros(amount) : "—";
}

export function BudgetMobileCard({
  row,
  showGapInPercent,
  onDelete,
  onEdit,
}: Props) {
  const estimated = row.estimatedUnitPrice * row.estimatedQuantity;
  const gap = getGapBetweenRealAndPrevisionnal(
    row.realCost,
    estimated,
    showGapInPercent,
  );
  const gapColor = getTextColorForGapFromLineType(row.lineType, gap);

  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 flex-1 truncate font-medium">{row.name}</p>
        {row.categoryName ? (
          <CategoryBadge
            name={row.categoryName}
            color={row.categoryColor}
            className="shrink-0"
          />
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-3 divide-x rounded-md border bg-muted/30">
        <div className="flex flex-col items-center gap-1 px-2 py-2.5">
          <span className="text-xs text-muted-foreground">Prévu</span>
          <span className="text-sm font-semibold tabular-nums">
            {formatAmount(estimated)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 px-2 py-2.5">
          <span className="text-xs text-muted-foreground">Réel</span>
          <span className="text-sm font-semibold tabular-nums">
            {formatAmount(row.realCost)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 px-2 py-2.5">
          <span className="text-xs text-muted-foreground">Écart</span>
          <span
            className={`text-sm font-semibold tabular-nums ${gapColor}`}
          >
            {formatGapForCell(gap, showGapInPercent)}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="line-clamp-2 min-w-0 flex-1 text-xs text-muted-foreground">
          {row.description || "—"}
        </p>
        <div
          className="shrink-0"
          onClick={(event) => event.stopPropagation()}
        >
          <BudgetLineActionsMenu
            row={row}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </div>
  );
}
