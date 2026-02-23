import { TypographyH2 } from "@/components/ui/typography";
import { BudgetTable } from "@/features/budget/components/budget-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/budget-table")({
  component: BudgetTablePage,
});

function BudgetTablePage() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6 flex flex-col gap-4">
      <TypographyH2>Budget prévisionnel</TypographyH2>
      <BudgetTable />
    </div>
  );
}
