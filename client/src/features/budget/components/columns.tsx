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
import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import {
  MessageCircleCheck,
  MessageCircleQuestion,
  MoreHorizontal,
} from "lucide-react";
import { getGapBetweenRealAndPrevisionnal } from "../utils";
import { BudgetGapCell } from "./budget-gap-cell";

export interface BudgetTableRow {
  id: number;
  name: string;
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  description: string;
  categoryName: string;
}

export const columns: ColumnDef<BudgetTableRow>[] = [
  {
    header: ({ column }) => <SortableHeader column={column} title="Nom" />,
    accessorKey: "name",
    meta: { className: "w-px whitespace-nowrap" },
  },
  {
    id: "estimatedCost",
    meta: { className: "w-px whitespace-nowrap" },
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title={
          <span className="flex items-center gap-1">
            Coût <MessageCircleQuestion className="h-4 w-4" />
          </span>
        }
        className="justify-end"
      />
    ),
    accessorFn: (row) => row.estimatedUnitPrice * row.estimatedQuantity,
    cell: ({ row }) => (
      <RowPrice
        amount={
          row.original.estimatedUnitPrice * row.original.estimatedQuantity
        }
      />
    ),
  },
  {
    id: "actualCost",
    meta: { className: "w-px whitespace-nowrap" },
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title={
          <span className="flex items-center gap-1">
            Coût <MessageCircleCheck className="h-4 w-4" />
          </span>
        }
        className="justify-end"
      />
    ),
    cell: () => <RowPrice amount={null} />,
  },
  {
    id: "gap",
    meta: { className: "w-px whitespace-nowrap" },
    header: ({ column }) => (
      <SortableHeader column={column} title="Écart" className="justify-end" />
    ),
    accessorFn: (row) => {
      const estimated = row.estimatedUnitPrice * row.estimatedQuantity;
      const actual = null;
      return getGapBetweenRealAndPrevisionnal(actual, estimated);
    },
    cell: ({ row }) => {
      const estimated =
        row.original.estimatedUnitPrice * row.original.estimatedQuantity;
      const actual = null;
      return (
        <BudgetGapCell
          lineType={BudgetLinesBudgetLineTypeInput.Expense}
          previsionnalAmount={estimated}
          realAmount={actual}
        />
      );
    },
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    meta: { className: "w-px whitespace-nowrap" },
    header: ({ column }) => (
      <SortableHeader column={column} title="Catégorie" />
    ),
    accessorKey: "categoryName",
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ row }) => (
      <Badge color="primary">{row.getValue("categoryName")}</Badge>
    ),
  },
  {
    id: "actions",
    meta: { className: "w-px whitespace-nowrap" },
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
