import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
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
      budgetLineType: BudgetLinesBudgetLineTypeInput.Expense,
    },
  });

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

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Budget prévisionnel</TypographyH2>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
