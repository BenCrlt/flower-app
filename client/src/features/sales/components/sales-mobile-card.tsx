import { MobileCardMeta } from "@/components/Table/DataTable";
import { RowPrice } from "@/components/Table/RowPrice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTimestampToLocaleString } from "@/utils/DateUtils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SalesTableRow } from "./columns";

interface Props {
  row: SalesTableRow;
  meta: MobileCardMeta;
}

export function SalesMobileCard({ row, meta }: Props) {
  const payerName =
    row.payerFirstName && row.payerLastName
      ? `${row.payerFirstName} ${row.payerLastName}`
      : null;

  const expandButton = meta.canExpand ? (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="size-8 shrink-0"
      onClick={(event) => {
        event.stopPropagation();
        meta.onToggleExpand();
      }}
      aria-label={
        meta.isExpanded ? "Masquer les articles" : "Afficher les articles"
      }
    >
      {meta.isExpanded ? (
        <ChevronDown className="size-4" />
      ) : (
        <ChevronRight className="size-4" />
      )}
    </Button>
  ) : null;

  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Badge className="shrink-0">{row.originName}</Badge>
        <div className="ml-auto flex shrink-0 items-center gap-0.5">
          <RowPrice
            amount={row.totalAmount}
            className="text-base font-semibold"
          />
          {expandButton}
        </div>
      </div>
      <p className="mt-2 text-sm font-medium">
        {formatTimestampToLocaleString(row.executedAt, "d MMMM yyyy")}
        {" · "}
        {formatTimestampToLocaleString(row.executedAt, "HH:mm")}
      </p>
      <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
        {payerName ? <p className="truncate">{payerName}</p> : null}
        {row.payerEmail ? (
          <p className="truncate">{row.payerEmail}</p>
        ) : null}
        {row.authorUsername ? (
          <p className="truncate">Par {row.authorUsername}</p>
        ) : null}
      </div>
    </div>
  );
}
