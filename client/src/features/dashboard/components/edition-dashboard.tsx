import { CurrentBalanceCard } from "./current-balance-card";
import { IncomeExpenseCard } from "./income-expense-card";

export function EditionDashboard() {
  return (
    <div className="grid grid-flow-col grid-rows-3 gap-4 py-4">
      <div className="col-span-2">
        <CurrentBalanceCard />
      </div>
      <div className="col-span-2 row-span-2">
        <IncomeExpenseCard />
      </div>
      <div className="col-span-5 row-span-2">03</div>
    </div>
  );
}
