import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { ColumnDef } from "@tanstack/react-table";

export interface ProductTableRow {
  id: number;
  name: string;
  unitPrice: number;
}

export function getColumns(): ColumnDef<ProductTableRow>[] {
  return [
    {
      header: ({ column }) => <SortableHeader column={column} title="Nom" />,
      accessorKey: "name",
      meta: { className: "w-px whitespace-nowrap" },
    },
    {
      accessorKey: "unitPrice",
      meta: { className: "w-px whitespace-nowrap" },
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
      meta: { className: "w-px whitespace-nowrap" },
      header: ({ column }) => (
        <SortableHeader column={column} title="Nombre de ventes" />
      ),
      cell: () => <div className="text-right font-medium">0</div>,
    },
  ];
}
