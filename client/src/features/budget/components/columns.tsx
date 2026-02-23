import { HeaderPrice } from "@/components/Table/HeaderPrice";
import { RowPrice } from "@/components/Table/RowPrice";
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
    header: "Nom",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: () => <HeaderPrice title="Prix unitaire (prévisionnel)" />,
    accessorKey: "estimatedUnitPrice",
    cell: ({ row }) => <RowPrice amount={row.original.estimatedUnitPrice} />,
  },
  {
    header: () => <HeaderPrice title="Quantité (prévisionnel)" />,
    accessorKey: "estimatedQuantity",
    cell: ({ row }) => (
      <div key={row.original.name} className="text-right font-medium">
        {row.original.estimatedQuantity}
      </div>
    ),
  },
  {
    id: "actualUnitPrice",
    header: () => <HeaderPrice title="Prix unitaire (réel)" />,
    cell: () => <RowPrice amount={0} />,
  },
  {
    id: "actualQuantity",
    header: () => <HeaderPrice title="Quantité (réel)" />,
    cell: () => <div className="text-right font-medium">{0}</div>,
  },
  {
    header: "Catégorie",
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
