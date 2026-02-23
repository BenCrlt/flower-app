import { BudgetTable } from "@/features/budget/components/budget-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/budget-table")({
  component: BudgetTablePage,
});

function BudgetTablePage() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <BudgetTable />
    </div>
  );
}
