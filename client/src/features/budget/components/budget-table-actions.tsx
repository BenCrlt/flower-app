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
import {
  BudgetCategoriesItem,
  BudgetLinesBudgetLineTypeInput,
} from "@/generated/graphql";
import { Table } from "@tanstack/react-table";
import { CirclePlus, Coins, ListFilter, PiggyBank } from "lucide-react";
import { useState } from "react";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategories";
import { BudgetTableRow } from "./columns";

interface Props {
  table: Table<BudgetTableRow>;
  onChangeLineType: (type: BudgetLinesBudgetLineTypeInput) => void;
}

export function BudgetTableFiltersAndActions({
  table,
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
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Rechercher..."
          value={value}
          onChange={(event) => {
            const value = event.target.value;
            table.setGlobalFilter(value);
          }}
          className="w-80"
        />
        {data?.budgetCategories.length && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={categories.length ? "default" : "outline"}
                className={"border-dashed"}
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
      <div className="flex items-center gap-2">
        <Tabs
          defaultValue="expense"
          onValueChange={(value) =>
            onChangeLineType(value as BudgetLinesBudgetLineTypeInput)
          }
        >
          <TabsList>
            <TabsTrigger value={BudgetLinesBudgetLineTypeInput.Income}>
              Recettes
              <PiggyBank />
            </TabsTrigger>
            <TabsTrigger value={BudgetLinesBudgetLineTypeInput.Expense}>
              Dépenses
              <Coins />
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          onClick={() => {
            setCategories([]);
            table.getColumn("categoryName")?.setFilterValue("");
          }}
          variant="default"
          className="ml-2"
        >
          Ajouter <CirclePlus />
        </Button>
      </div>
    </div>
  );
}
