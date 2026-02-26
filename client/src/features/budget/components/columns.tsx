import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { Badge } from "@/components/ui/badge";
import {
  BudgetCategoriesItem,
  BudgetLinesBudgetLineTypeInput,
} from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { MessageCircleCheck, MessageCircleQuestion } from "lucide-react";
import { getGapBetweenRealAndPrevisionnal } from "../utils";
import { BudgetGapCell } from "./budget-gap-cell";
import { BudgetLineActionsCell } from "./budget-line-actions-cell";

export interface BudgetTableRow {
  id: number;
  name: string;
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  description: string;
  categoryName: string;
  budgetCategoryId: number;
}

interface GetBudgetLineColumnsProps {
  onDelete: (id: number) => void;
  allCategories?: BudgetCategoriesItem[];
}

export function getColumns({
  onDelete,
  allCategories,
}: GetBudgetLineColumnsProps): ColumnDef<BudgetTableRow>[] {
  return [
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
      cell: ({ row }) => (
        <BudgetLineActionsCell
          row={row}
          onDelete={onDelete}
          allCategories={allCategories}
        />
      ),
    },
  ];
}
