import { CategoryBadge } from "@/components/CategoryBadge";
import { DateRangePicker, StrictDateRange } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BudgetCategoriesItem } from "@/generated/graphql";
import { ListFilter } from "lucide-react";

interface Props {
  originIdsFilter: number[];
  handleSelectOrigin: (originId: number, checked: boolean) => void;
  originOptions: { id: number; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  selectedCategoryIds: number[];
  selectedBudgetLineIds: number[];
  categoryOptions: Pick<BudgetCategoriesItem, "id" | "name" | "color">[];
  articleOptions: { id: number; name: string }[];
  handleSelectCategory: (categoryId: number, checked: boolean) => void;
  handleSelectBudgetLine: (budgetLineId: number, checked: boolean) => void;
}

export const SalesPanelActionsAndFiltersCard = ({
  originIdsFilter,
  originOptions,
  handleSelectOrigin,
  dateRange,
  handleSelectDateRange,
  selectedCategoryIds,
  selectedBudgetLineIds,
  categoryOptions,
  articleOptions,
  handleSelectCategory,
  handleSelectBudgetLine,
}: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <CardTitle>Filtres</CardTitle>
          <CardDescription>
            Filtrez les ventes par période, origine, catégorie et article.
          </CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <DateRangePicker
            dateRange={dateRange}
            handleSelectDateRange={handleSelectDateRange}
          />
          {originOptions.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={originIdsFilter.length ? "default" : "outline"}
                  className="w-full border-dashed sm:w-auto sm:max-w-fit"
                >
                  <ListFilter />
                  Origine{" "}
                  {originIdsFilter.length ? `(${originIdsFilter.length})` : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuGroup>
                  {originOptions.map((origin) => (
                    <DropdownMenuCheckboxItem
                      key={origin.id}
                      className="capitalize"
                      checked={originIdsFilter.includes(origin.id)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(value) =>
                        handleSelectOrigin(origin.id, value)
                      }
                    >
                      {origin.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {categoryOptions.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={selectedCategoryIds.length ? "default" : "outline"}
                  className="w-full border-dashed sm:w-auto sm:max-w-fit"
                >
                  <ListFilter />
                  Catégories{" "}
                  {selectedCategoryIds.length
                    ? `(${selectedCategoryIds.length})`
                    : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-44">
                <DropdownMenuGroup>
                  {categoryOptions.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category.id}
                      className="capitalize"
                      checked={selectedCategoryIds.includes(category.id)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(value) =>
                        handleSelectCategory(category.id, value)
                      }
                    >
                      <CategoryBadge
                        name={category.name}
                        color={category.color}
                      />
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {articleOptions.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={selectedBudgetLineIds.length ? "default" : "outline"}
                  className="w-full border-dashed sm:w-auto sm:max-w-fit"
                >
                  <ListFilter />
                  Articles{" "}
                  {selectedBudgetLineIds.length
                    ? `(${selectedBudgetLineIds.length})`
                    : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-72 w-56 overflow-y-auto"
              >
                <DropdownMenuGroup>
                  {articleOptions.map((article) => (
                    <DropdownMenuCheckboxItem
                      key={article.id}
                      checked={selectedBudgetLineIds.includes(article.id)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={(value) =>
                        handleSelectBudgetLine(article.id, value)
                      }
                    >
                      <span className="truncate">{article.name}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
