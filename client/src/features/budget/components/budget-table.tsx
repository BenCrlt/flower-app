import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { useMemo, useState } from "react";
import { useDeleteBudgetLineMutation } from "../hooks/useDeleteBudgetLineMutation";
import { useGetBudgetCategoriesQuery } from "../hooks/useGetBudgetCategoriesQuery";
import { useGetBudgetLinesQuery } from "../hooks/useGetBudgetLinesQuery";
import { BudgetTableFiltersAndActions } from "./budget-table-actions";
import { BudgetTableRow, getColumns } from "./columns";
import { EditBudgetLineSheet } from "./edit-budget-line-sheet";

export function BudgetTable() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<BudgetLinesBudgetLineTypeInput>(
    BudgetLinesBudgetLineTypeInput.Expense,
  );
  const [selectedRow, setSelectedRow] = useState<BudgetTableRow | null>(null);

  const { data } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: lineType,
    },
  });

  const { data: categoriesData } = useGetBudgetCategoriesQuery();

  const { mutate: deleteBudgetLine } = useDeleteBudgetLineMutation();

  const rows = useMemo<BudgetTableRow[]>(
    () =>
      data?.budgetLines.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        estimatedUnitPrice: Number(item.estimatedUnitPrice),
        estimatedQuantity: item.estimatedQuantity,
        categoryName: item.category?.name ?? "",
        budgetCategoryId: item.category?.id ?? 0,
      })) || [],
    [data],
  );

  const handleDeleteLine = (id: number) => deleteBudgetLine({ id });

  const columns = getColumns({
    onDelete: handleDeleteLine,
    allCategories: categoriesData?.budgetCategories,
  });

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Budget prévisionnel</TypographyH2>
      <DataTable
        columns={columns}
        data={rows}
        onRowClick={(row) => setSelectedRow(row)}
        actions={(table) => (
          <BudgetTableFiltersAndActions
            table={table}
            onChangeLineType={(type) => setLineType(type)}
            lineType={lineType}
          />
        )}
      />
      {selectedRow && (
        <EditBudgetLineSheet
          open={!!selectedRow}
          onOpenChange={(open) => {
            if (!open) setSelectedRow(null);
          }}
          line={selectedRow}
          allCategories={categoriesData?.budgetCategories}
        />
      )}
    </div>
  );
}
