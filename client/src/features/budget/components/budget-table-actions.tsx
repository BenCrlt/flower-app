import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BudgetCategoriesItem } from "@/generated/graphql";
import { Table } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";
import { useState } from "react";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategories";
import { BudgetTableRow } from "./columns";

export function BudgetTableFiltersAndActions({
  table,
}: {
  table: Table<BudgetTableRow>;
}) {
  const { data } = useGetBudgetCategoriesQuery();
  const [categories, setCategories] = useState<BudgetCategoriesItem[]>([]);
  const value = table.getColumn("name")?.getFilterValue() as string;

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
                      onCheckedChange={(value) => {
                        const next = value
                          ? [...categories, category]
                          : categories.filter((c) => c.id !== category.id);
                        setCategories(next);
                        table
                          .getColumn("categoryName")
                          ?.setFilterValue(next.map((c) => c.name));
                      }}
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
    </div>
  );
}
