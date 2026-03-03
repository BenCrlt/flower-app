import { SortableHeader } from "@/components/Table/SortableHeader";
import { InvoiceStatus } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusBadge } from "./payment-status-badge";

export interface PaymentTableRow {
  id: number;
  vendorName: string;
  totalAmount: number;
  status: InvoiceStatus;
  executedAt: string;
  note: string;
}

export function getColumns(): ColumnDef<PaymentTableRow>[] {
  return [
    {
      header: ({ column }) => (
        <SortableHeader column={column} title="Vendeur" />
      ),
      accessorKey: "vendorName",
      meta: { className: "w-px whitespace-nowrap" },
    },
    {
      accessorKey: "totalAmount",
      meta: { className: "w-px whitespace-nowrap" },
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Montant total"
          className="justify-end"
        />
      ),
    },
    {
      meta: { className: "w-px whitespace-nowrap" },
      header: ({ column }) => <SortableHeader column={column} title="Status" />,
      accessorKey: "status",
      filterFn: (row, columnId, filterValue: string[]) => {
        if (!filterValue.length) return true;
        return filterValue.includes(row.getValue(columnId));
      },
      cell: ({ row }) => <PaymentStatusBadge status={row.original.status} />,
    },
    {
      header: "Exécuté le",
      accessorKey: "executedAt",
      meta: { className: "w-px whitespace-nowrap" },
    },
    {
      header: "Note",
      accessorKey: "note",
      meta: { className: "max-w-48" },
      cell: ({ getValue }) => (
        <span className="block truncate" title={getValue<string>()}>
          {getValue<string>()}
        </span>
      ),
    },
  ];
}
