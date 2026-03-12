import { BudgetTable } from "@/features/budget/components/budget-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/budget-table")({
  component: BudgetTablePage,
});

function BudgetTablePage() {
  return <BudgetTable />;
}
