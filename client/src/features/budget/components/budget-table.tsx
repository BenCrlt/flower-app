import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { useMemo, useState } from "react";
import { useDeleteBudgetLineMutation } from "../hooks/useDeleteBudgetLineMutation";
import { useGetBudgetLinesQuery } from "../hooks/useGetBudgetLinesQuery";
import { BudgetTableFiltersAndActions } from "./budget-table-actions";
import { BudgetTableRow, getColumns } from "./columns";

export function BudgetTable() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<BudgetLinesBudgetLineTypeInput>(
    BudgetLinesBudgetLineTypeInput.Expense,
  );

  const { data } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      budgetLineType: lineType,
    },
  });

  const { mutate: deleteBudgetLine } = useDeleteBudgetLineMutation();

  const rows = useMemo<BudgetTableRow[]>(
    () =>
      data?.budgetLines.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description ?? "",
        estimatedUnitPrice: item.estimatedUnitPrice,
        estimatedQuantity: item.estimatedQuantity,
        categoryName: item.category?.name ?? "",
      })) || [],
    [data],
  );

  const handleDeleteLine = (id: number) => deleteBudgetLine({ id });

  const columns = getColumns({ onDelete: handleDeleteLine });

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Budget prévisionnel</TypographyH2>
      <DataTable
        columns={columns}
        data={rows}
        actions={(table) => (
          <BudgetTableFiltersAndActions
            table={table}
            onChangeLineType={(type) => setLineType(type)}
            lineType={lineType}
          />
        )}
      />
    </div>
  );
}
