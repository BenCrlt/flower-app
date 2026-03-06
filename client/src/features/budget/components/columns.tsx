import { CategoryBadge } from "@/components/CategoryBadge";
import { RowPrice } from "@/components/Table/RowPrice";
import { SortableHeader } from "@/components/Table/SortableHeader";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
import { ColumnDef } from "@tanstack/react-table";
import { MessageCircleCheck, MessageCircleQuestion } from "lucide-react";
import { getGapBetweenRealAndPrevisionnal } from "../utils";
import { BudgetGapCell } from "./budget-gap-cell";
import { BudgetLineActionsCell } from "./budget-line-actions-cell";
import { GapCellHeader } from "./gap-cell-header";

export interface BudgetTableRow {
  id: number;
  name: string;
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  description: string;
  categoryName: string;
  categoryColor: string;
  budgetCategoryId: number;
  realCost: number | null;
}

interface GetBudgetLineColumnsProps {
  onDelete: (id: number) => void;
  allCategories?: BudgetCategoriesItem[];
  showGapInPercent: boolean;
  onToggleGapInPercent: () => void;
}

export function getColumns({
  onDelete,
  allCategories,
  showGapInPercent,
  onToggleGapInPercent,
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
      cell: ({ row }) => <RowPrice amount={row.original.realCost} />,
    },
    {
      id: "gap",
      meta: { className: "w-px whitespace-nowrap" },
      header: ({ column }) => (
        <GapCellHeader
          column={column}
          onToggleGapInPercent={onToggleGapInPercent}
          showGapInPercent={showGapInPercent}
        />
      ),
      accessorFn: (row) => {
        const estimated = row.estimatedUnitPrice * row.estimatedQuantity;
        const actual = row.realCost;
        return getGapBetweenRealAndPrevisionnal(actual, estimated);
      },
      cell: ({ row }) => {
        const estimated =
          row.original.estimatedUnitPrice * row.original.estimatedQuantity;
        const actual = row.original.realCost;
        return (
          <BudgetGapCell
            lineType={LineTypeEnum.Expense}
            previsionnalAmount={estimated}
            realAmount={actual}
            inPercent={showGapInPercent}
          />
        );
      },
    },
    {
      header: "Description",
      accessorKey: "description",
      meta: { className: "max-w-48" },
      cell: ({ getValue }) => (
        <span className="block truncate" title={getValue<string>()}>
          {getValue<string>()}
        </span>
      ),
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
        <CategoryBadge
          name={row.original.categoryName}
          color={row.original.categoryColor}
        />
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
