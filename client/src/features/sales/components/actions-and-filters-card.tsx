import { CategoryBadge } from "@/components/CategoryBadge";
import { CheckboxFilterSheet } from "@/components/CheckboxFilterSheet";
import {
  DateRangePicker,
  DateRangeQuickFilter,
  StrictDateRange,
} from "@/components/date-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { BudgetCategoriesItem } from "@/generated/graphql";

interface Props {
  originIdsFilter: number[];
  handleSelectOrigin: (originId: number, checked: boolean) => void;
  originOptions: { id: number; name: string }[];
  dateRange: StrictDateRange;
  handleSelectDateRange: (dateRange: StrictDateRange) => void;
  dateRangeQuickFilters: DateRangeQuickFilter[];
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
  dateRangeQuickFilters,
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
            quickFilters={dateRangeQuickFilters}
          />
          {originOptions.length > 0 ? (
            <CheckboxFilterSheet
              label="Origine"
              options={originOptions.map((origin) => ({
                id: origin.id,
                label: origin.name,
              }))}
              selectedIds={originIdsFilter}
              onToggle={handleSelectOrigin}
            />
          ) : null}
          {categoryOptions.length > 0 ? (
            <CheckboxFilterSheet
              label="Catégories"
              options={categoryOptions.map((category) => ({
                id: category.id,
                label: category.name,
              }))}
              selectedIds={selectedCategoryIds}
              onToggle={handleSelectCategory}
              renderOption={(option) => {
                const category = categoryOptions.find(
                  (item) => item.id === option.id,
                );
                if (!category) {
                  return option.label;
                }
                return (
                  <CategoryBadge name={category.name} color={category.color} />
                );
              }}
            />
          ) : null}
          {articleOptions.length > 0 ? (
            <CheckboxFilterSheet
              label="Articles"
              options={articleOptions.map((article) => ({
                id: article.id,
                label: article.name,
              }))}
              selectedIds={selectedBudgetLineIds}
              onToggle={handleSelectBudgetLine}
              contentClassName="max-h-72"
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
