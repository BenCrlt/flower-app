import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
import { Table } from "@tanstack/react-table";
import { ListFilter, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategoriesQuery";
import { AddBudgetLineSheet } from "./add-budget-line-sheet";
import { BudgetTableRow } from "./columns";

interface Props {
  table: Table<BudgetTableRow>;
  lineType: LineTypeEnum;
  onlyUnplanned: boolean;
  unplannedCount: number;
  onToggleOnlyUnplanned: () => void;
  onClearOnlyUnplanned: () => void;
}

export function BudgetTableFiltersAndActions({
  table,
  lineType,
  onlyUnplanned,
  unplannedCount,
  onToggleOnlyUnplanned,
  onClearOnlyUnplanned,
}: Props) {
  const { data } = useGetBudgetCategoriesQuery();
  const [categories, setCategories] = useState<BudgetCategoriesItem[]>([]);
  const value = (table.getState().globalFilter as string | undefined) ?? "";
  const hasActiveFilters = Boolean(value || categories.length || onlyUnplanned);

  const handleSelectCategory = (
    category: BudgetCategoriesItem,
    isChecked: boolean,
  ) => {
    const next = isChecked
      ? [...categories, category]
      : categories.filter((c) => c.id !== category.id);
    setCategories(next);
    table.getColumn("categoryName")?.setFilterValue(next.map((c) => c.name));
  };

  const handleClearFilters = () => {
    setCategories([]);
    table.resetColumnFilters();
    table.setGlobalFilter("");
    onClearOnlyUnplanned();
  };

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:flex-wrap">
          <Input
            placeholder="Rechercher..."
            value={value}
            onChange={(event) => {
              const value = event.target.value;
              table.setGlobalFilter(value);
            }}
            className="h-11 w-full md:h-9 md:w-80"
          />
          <Button
            type="button"
            variant={onlyUnplanned ? "secondary" : "outline"}
            className="h-11 w-full border-dashed md:h-9 md:w-auto"
            onClick={onToggleOnlyUnplanned}
          >
            <ListFilter />
            Non prévues
            {unplannedCount ? ` (${unplannedCount})` : ""}
          </Button>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="ghost"
              className="h-11 w-full md:h-9 md:w-auto"
              onClick={handleClearFilters}
            >
              <RotateCcw />
              Réinitialiser
            </Button>
          ) : null}
        </div>
        {data?.budgetCategories.length ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {data.budgetCategories.map((category) => {
              const isSelected = categories.some(
                (item) => item.id === category.id,
              );

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectCategory(category, !isSelected)}
                  className={cn(
                    "inline-flex h-7 shrink-0 items-center rounded-full border px-2.5 text-xs font-medium transition-colors",
                    !isSelected && "bg-background hover:bg-muted",
                  )}
                  style={
                    isSelected
                      ? {
                          backgroundColor: category.color,
                          borderColor: category.color,
                          color: "#fff",
                        }
                      : { borderColor: category.color, color: category.color }
                  }
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col sm:w-auto [&_button]:h-11 [&_button]:w-full sm:[&_button]:h-9 sm:[&_button]:w-auto">
        <AddBudgetLineSheet
          lineType={lineType}
          allCategories={data?.budgetCategories || []}
        />
      </div>
    </div>
  );
}
