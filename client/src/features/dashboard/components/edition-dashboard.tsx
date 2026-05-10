import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetEditionStatsQuery } from "../hooks/useGetEditionStats";
import type { EditionStats } from "../types";
import { BudgetByCategoriesChart } from "./budget-by-categories-chart";
import { CurrentBalanceCard } from "./current-balance-card";
import { ForecastVsActualCards } from "./forecast-vs-actual-cards";

export type { EditionStats };

export function EditionDashboard() {
  const { edition } = useEdition();

  const { data, isPending } = useGetEditionStatsQuery({
    variables: {
      editionId: edition.id,
    },
  });
  const stats = data?.edition;
  const editionStatsFallback: EditionStats = {
    id: edition.id,
    totalExpense: 0,
    totalIncome: 0,
    totalPrevisionnalExpense: 0,
    totalPrevisionnalIncome: 0,
  };

  return (
    <div className="w-full max-w-300">
      <TypographyH2 className="mb-2">Tableau de bord</TypographyH2>
      <div className="flex flex-col gap-6 py-4">
        <CurrentBalanceCard
          openingBalance={edition.openingBalance}
          totalIncome={isPending ? null : (stats?.totalIncome ?? 0)}
          totalExpense={isPending ? null : (stats?.totalExpense ?? 0)}
          isLoading={isPending}
        />
        <ForecastVsActualCards
          edition={isPending ? null : (stats ?? editionStatsFallback)}
          isLoading={isPending}
        />
        <BudgetByCategoriesChart />
      </div>
    </div>
  );
}
