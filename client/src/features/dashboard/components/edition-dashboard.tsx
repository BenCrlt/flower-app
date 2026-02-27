import { TypographyH2 } from "@/components/ui/typography";
import { BudgetByCategoriesChart } from "./budget-by-categories-chart";
import { CurrentBalanceCard } from "./current-balance-card";
import { IncomeExpenseCard } from "./income-expense-card";

export function EditionDashboard() {
  return (
    <div className="w-full max-w-300">
      <TypographyH2>Tableau de bord</TypographyH2>
      <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-5 md:grid-rows-3">
        <div className="*:h-full md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1">
          <CurrentBalanceCard />
        </div>
        <div className="*:h-full md:col-start-1 md:col-span-2 md:row-start-2 md:row-span-2">
          <IncomeExpenseCard />
        </div>
        <div className="*:h-full md:col-start-3 md:col-span-3 md:row-start-1 md:row-span-3">
          <BudgetByCategoriesChart />
        </div>
      </div>
    </div>
  );
}
