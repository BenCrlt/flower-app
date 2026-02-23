import { DataTable } from "@/components/DataTable";
import { useEdition } from "@/features/edition/EditionContext";
import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { useMemo } from "react";
import { useGetBudgetLinesQuery } from "../hooks/useGetBudgetLines";
import { BudgetTableRow, columns } from "./columns";

export function BudgetTable() {
  const { edition } = useEdition();

  const { data } = useGetBudgetLinesQuery({
    variables: {
      editionId: edition.id,
      paginatedInput: { page: 1, limit: 10 },
      budgetLineType: BudgetLinesBudgetLineTypeInput.Expense,
    },
  });

  const rows = useMemo<BudgetTableRow[]>(
    () =>
      data?.budgetLines.map((item) => ({
        name: item.name,
        description: item.description ?? "",
        estimatedUnitPrice: item.estimatedUnitPrice,
        estimatedQuantity: item.estimatedQuantity,
        categoryName: item.category?.name ?? "",
      })) || [],
    [data],
  );

  return <DataTable columns={columns} data={rows} />;
}
