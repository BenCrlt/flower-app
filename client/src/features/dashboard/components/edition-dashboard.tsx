import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetEditionStatsQuery } from "../hooks/useGetEditionStats";
import type { EditionStats } from "../types";
import { BudgetByCategoriesChart } from "./budget-by-categories-chart";
import { EditionComparisonChart } from "./edition-comparison-chart";
import { InvoiceStatusSummary } from "./invoice-status-summary";
import { KpiRow } from "./kpi-row";
import { TopSellingProducts } from "./top-selling-products";

export type { EditionStats };

export function EditionDashboard() {
  const { edition } = useEdition();

  const { data, isPending } = useGetEditionStatsQuery({
    variables: {
      editionId: edition.id,
    },
  });

  return (
    <div className="w-full max-w-300">
      <TypographyH2 className="mb-2">Tableau de bord</TypographyH2>
      <div className="flex flex-col gap-6 py-4">
        <KpiRow
          openingBalance={edition.openingBalance}
          stats={data?.edition}
          isLoading={isPending}
        />
        <BudgetByCategoriesChart />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <InvoiceStatusSummary />
          <TopSellingProducts />
        </div>
        <EditionComparisonChart />
      </div>
    </div>
  );
}
