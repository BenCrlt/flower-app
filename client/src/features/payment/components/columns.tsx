import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { InvoiceStatus } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { InvoicesTableActionsLine } from "./invoices-table-actions-line";

export interface PaymentLineRow {
  id: number;
  budgetLineId: number;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceTableRow {
  id: number;
  name: string;
  vendorId: number;
  vendorName: string;
  totalAmount: number;
  status: InvoiceStatus;
  executedAt: string;
  note: string;
  payments: PaymentLineRow[];
}

interface GetInvoicesTableColumns {
  onDelete: (id: number) => void;
  onEdit: (row: InvoiceTableRow) => void;
}

export function getColumns({
  onDelete,
  onEdit,
}: GetInvoicesTableColumns): ColumnDef<InvoiceTableRow>[] {
  return [
    {
      header: ({ column }) => <SortableHeader column={column} title="Nom" />,
      accessorKey: "name",
      meta: { className: "w-px whitespace-nowrap" },
    },
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
      cell: ({ row }) => <InvoiceStatusBadge status={row.original.status} />,
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
        <InvoicesTableActionsLine
          row={row}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ),
    },
  ];
}
