import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { InvoiceStatus } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { PaymentStatusBadge } from "./payment-status-badge";
import { PaymentsTableActionsLine } from "./payments-table-actions-line";

export interface PaymentTableRow {
  id: number;
  vendorName: string;
  totalAmount: number;
  status: InvoiceStatus;
  executedAt: string;
  note: string;
}

interface GetPaymentTableColumns {
  onDelete: (id: number) => void;
}

export function getColumns({
  onDelete,
}: GetPaymentTableColumns): ColumnDef<PaymentTableRow>[] {
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
      cell: ({ row }) => <RowPrice amount={row.original.totalAmount} />,
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
    {
      id: "actions",
      meta: { className: "w-px whitespace-nowrap" },
      cell: ({ row }) => (
        <PaymentsTableActionsLine row={row} onDelete={onDelete} />
      ),
    },
  ];
}
