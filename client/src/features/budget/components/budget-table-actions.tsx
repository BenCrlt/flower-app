import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BudgetCategoriesItem, LineTypeEnum } from "@/generated/graphql";
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
}

export function BudgetTableFiltersAndActions({
  table,
  lineType,
  onChangeLineType,
}: Props) {
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
          className="w-full md:w-80"
        />
        {data?.budgetCategories.length && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={categories.length ? "default" : "outline"}
                className={"w-full border-dashed md:w-auto"}
              >
                <ListFilter />
                Catégories {categories.length ? `(${categories.length})` : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                {data.budgetCategories.map((category) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={category.id}
                      className="capitalize"
                      checked={categories.some((c) => c.id === category.id)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(value) =>
                        handleSelectCategory(category, value)
                      }
                    >
                      {category.name}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Tabs
          className="w-full sm:w-auto"
          defaultValue={LineTypeEnum.Income}
          onValueChange={(value) => onChangeLineType(value as LineTypeEnum)}
        >
          <TabsList className="grid w-full grid-cols-2 sm:inline-flex sm:w-auto">
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
        <div className="flex w-full flex-col sm:w-auto [&_button]:w-full sm:[&_button]:w-auto">
          <AddBudgetLineSheet
            lineType={lineType}
            allCategories={data?.budgetCategories || []}
          />
        </div>
      </div>
    </div>
  );
}
