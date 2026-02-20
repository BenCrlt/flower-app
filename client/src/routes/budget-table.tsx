import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/budget-table")({
  component: BudgetTablePage,
});

function BudgetTablePage() {
  return (
    <div className="h-full">
      <div className="h-full rounded-4xl border bg-background text-card-foreground shadow">
        MON BUDGGEET TABLE
      </div>
    </div>
  );
}
