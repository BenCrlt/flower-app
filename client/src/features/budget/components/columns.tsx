import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface BudgetTableRow {
  id: number;
  name: string;
  description: string;
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  categoryName: string;
}

export const columns: ColumnDef<BudgetTableRow>[] = [
  {
    header: ({ column }) => <SortableHeader column={column} title="Nom" />,
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Prix unitaire (prévisionnel)"
        className="justify-end"
      />
    ),
    accessorKey: "estimatedUnitPrice",
    cell: ({ row }) => <RowPrice amount={row.original.estimatedUnitPrice} />,
  },
  {
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Quantité (prévisionnel)"
        className="justify-end"
      />
    ),
    accessorKey: "estimatedQuantity",
    cell: ({ row }) => (
      <div key={row.original.name} className="text-right font-medium">
        {row.original.estimatedQuantity}
      </div>
    ),
  },
  {
    id: "actualUnitPrice",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Prix unitaire (réel)"
        className="justify-end"
      />
    ),
    cell: () => <RowPrice amount={0} />,
  },
  {
    id: "actualQuantity",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Quantité (réel)"
        className="justify-end"
      />
    ),
    cell: () => <div className="text-right font-medium">{0}</div>,
  },
  {
    header: ({ column }) => (
      <SortableHeader column={column} title="Catégorie" />
    ),
    accessorKey: "categoryName",
    cell: ({ row }) => (
      <Badge color="primary">{row.getValue("categoryName")}</Badge>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem>Modifier</DropdownMenuItem>
          <DropdownMenuItem>Supprimer</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
