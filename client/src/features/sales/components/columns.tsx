import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { Badge } from "@/components/ui/badge";
import { formatTimestampToLocaleString } from "@/utils/DateUtils";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface SalesTableRow {
  id: number;
  totalAmount: number;
  executedAt: string;
  payerFirstName: string | null;
  payerLastName: string | null;
  payerEmail: string | null;
  helloAssoOrderId: number | null;
  authorUsername: string | null;
  sales: {
    id: number;
    quantity: number;
    budgetLineName: string;
    estimatedUnitPrice: number;
    categoryName: string | null;
    categoryColor: string | null;
  }[];
}

export function getColumns(): ColumnDef<SalesTableRow>[] {
  return [
    {
      accessorKey: "authorUsername",
      meta: { className: "w-px whitespace-nowrap" },
      header: ({ column }) => <SortableHeader column={column} title="Auteur" />,
      cell: ({ row }) => <Badge>{row.original.authorUsername}</Badge>,
    },
    {
      header: ({ column }) => (
        <SortableHeader column={column} title="Exécuté le" />
      ),
      accessorKey: "executedAt",
      meta: { className: "w-px whitespace-nowrap" },
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">
            {formatTimestampToLocaleString(
              row.original.executedAt,
              "dd MMMM yyyy",
            )}
          </span>
          <span className="text-sm text-gray-500">
            {formatTimestampToLocaleString(row.original.executedAt, "HH:mm")}
          </span>
        </div>
      ),
    },
    {
      header: "Acheteur",
      accessorFn: (row) =>
        row.payerFirstName && row.payerLastName
          ? `${row.payerFirstName} ${row.payerLastName}`
          : "-",
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Montant total"
          className="justify-end"
        />
      ),
      meta: { className: "w-px whitespace-nowrap" },
      cell: ({ row }) => <RowPrice amount={row.original.totalAmount} />,
    },
    {
      id: "actions",
      meta: { className: "w-px whitespace-nowrap" },
      cell: () => <MoreHorizontal />,
    },
  ];
}
