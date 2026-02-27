import { BudgetByCategoriesChart } from "./budget-by-categories-chart";
import { CurrentBalanceCard } from "./current-balance-card";
import { IncomeExpenseCard } from "./income-expense-card";

export function EditionDashboard() {
  return (
    <div className="flex gap-4 py-4">
      <div className="flex w-1/3 flex-col gap-4">
        <CurrentBalanceCard />
        <IncomeExpenseCard />
      </div>
      <div className="w-2/3">
        <BudgetByCategoriesChart />
      </div>
    </div>
  );
}
