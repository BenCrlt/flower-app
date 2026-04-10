import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface ProductTableRow {
  id: number;
  name: string;
  unitPrice: number;
  salesCount: number;
}

export function getColumns(): ColumnDef<ProductTableRow>[] {
  return [
    {
      header: ({ column }) => <SortableHeader column={column} title="Nom" />,
      accessorKey: "name",
    },
    {
      accessorKey: "unitPrice",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Prix unitaire"
          className="justify-end"
        />
      ),
      cell: ({ row }) => <RowPrice amount={row.original.unitPrice} />,
    },
    {
      accessorKey: "salesCount",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Nombre de ventes"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <div className="text-right font-medium">{row.original.salesCount}</div>
      ),
    },
    {
      id: "totalSales",
      header: ({ column }) => (
        <SortableHeader
          column={column}
          title="Total des ventes"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <RowPrice amount={row.original.unitPrice * row.original.salesCount} />
      ),
    },
    {
      id: "actions",
      meta: { className: "w-px whitespace-nowrap" },
      cell: () => <MoreHorizontal />,
    },
  ];
}
