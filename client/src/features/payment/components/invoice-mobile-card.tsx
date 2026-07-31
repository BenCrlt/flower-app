import { RowPrice } from "@/components/Table/RowPrice";
import { formatTimestampToLocaleString } from "@/utils/DateUtils";
import { InvoiceTableRow } from "./columns";
import { InvoiceActionsMenu } from "./invoice-actions-menu";
import { InvoiceStatusBadge } from "./invoice-status-badge";

interface Props {
  row: InvoiceTableRow;
  onEdit: (row: InvoiceTableRow) => void;
  onDelete: (id: number) => void;
}

export function InvoiceMobileCard({ row, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 flex-1 truncate font-medium">{row.name}</p>
        <InvoiceStatusBadge status={row.status} />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {formatTimestampToLocaleString(row.executedAt, "d MMMM yyyy")}
        {" · "}
        <span className="truncate">{row.vendorName}</span>
      </p>
      <div className="mt-2 flex items-end justify-between gap-2">
        <p className="line-clamp-2 min-w-0 flex-1 text-xs text-muted-foreground">
          {row.note || "—"}
        </p>
        <div className="flex shrink-0 items-center gap-1">
          <RowPrice
            amount={row.totalAmount}
            className="text-base font-semibold"
          />
          <div onClick={(event) => event.stopPropagation()}>
            <InvoiceActionsMenu row={row} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
