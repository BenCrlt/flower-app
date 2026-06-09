import { CheckboxFilterSheet } from "@/components/CheckboxFilterSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
import { useIsMobile } from "@/hooks/use-mobile";
import { Table } from "@tanstack/react-table";
import { Coins, ListFilter, PiggyBank } from "lucide-react";
import { useState } from "react";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategoriesQuery";
import { AddBudgetLineSheet } from "./add-budget-line-sheet";
import { BudgetTableRow } from "./columns";

interface Props {
  table: Table<BudgetTableRow>;
  lineType: LineTypeEnum;
  onChangeLineType: (type: LineTypeEnum) => void;
  showGapInPercent: boolean;
  onToggleGapInPercent: () => void;
}

export function BudgetTableFiltersAndActions({
  table,
  lineType,
  onChangeLineType,
  showGapInPercent,
  onToggleGapInPercent,
}: Props) {
  const isMobile = useIsMobile();
  const { data } = useGetBudgetCategoriesQuery();
  const [categories, setCategories] = useState<BudgetCategoriesItem[]>([]);
  const value = table.getColumn("name")?.getFilterValue() as string;

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

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Rechercher..."
          value={value}
          onChange={(event) => {
            const value = event.target.value;
            table.setGlobalFilter(value);
          }}
          className="h-11 w-full md:h-9 md:w-80"
        />
        {data?.budgetCategories.length ? (
          <CheckboxFilterSheet
            label="Catégories"
            options={data.budgetCategories.map((category) => ({
              id: category.id,
              label: category.name,
            }))}
            selectedIds={categories.map((category) => category.id)}
            onToggle={(id, checked) => {
              const category = data.budgetCategories.find(
                (item) => item.id === id,
              );
              if (category) {
                handleSelectCategory(category, checked);
              }
            }}
            triggerClassName="md:w-auto"
          />
        ) : null}
        {isMobile ? (
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full border-dashed md:h-9 md:w-auto"
            onClick={onToggleGapInPercent}
          >
            <ListFilter />
            Écart en {showGapInPercent ? "%" : "€"}
          </Button>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Tabs
          className="w-full sm:w-auto"
          defaultValue={LineTypeEnum.Income}
          onValueChange={(value) => onChangeLineType(value as LineTypeEnum)}
        >
          <TabsList className="grid h-11 w-full grid-cols-2 sm:inline-flex sm:h-9 sm:w-auto">
            <TabsTrigger value={LineTypeEnum.Income}>
              Recettes
              <PiggyBank />
            </TabsTrigger>
            <TabsTrigger value={LineTypeEnum.Expense}>
              Dépenses
              <Coins />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex w-full flex-col sm:w-auto [&_button]:h-11 [&_button]:w-full sm:[&_button]:h-9 sm:[&_button]:w-auto">
          <AddBudgetLineSheet
            lineType={lineType}
            allCategories={data?.budgetCategories || []}
          />
        </div>
      </div>
    </div>
  );
}
