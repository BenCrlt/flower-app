import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { getBudgetLineTypeString } from "@/features/budget/utils";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { Link } from "@tanstack/react-router";
import { upperFirst } from "lodash";
import { ArrowUpRight, Coins, PiggyBank } from "lucide-react";
import { useMemo, useState } from "react";
import { Pie, PieChart } from "recharts";
import { useGetBudgetStatsByCategoriesQuery } from "../hooks/useGetBudgetStatsByCategoriesQuery";

const SLICE_FILLS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

type BudgetValuesView = "actual" | "forecast";

type CategorySlice = {
  name: string;
  value: number;
  fill: string;
  percentOfTotal: number;
  actualTotal: number;
  forecastTotal: number;
};

export function BudgetByCategoriesChart() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<LineTypeEnum>(LineTypeEnum.Expense);
  const [valuesView, setValuesView] = useState<BudgetValuesView>("actual");
  const { data: budgetStatsByCategories, isPending } =
    useGetBudgetStatsByCategoriesQuery({
      variables: {
        editionId: edition.id,
        lineType,
      },
    });

  const categorySlices: CategorySlice[] = useMemo(() => {
    const rows = budgetStatsByCategories?.getBudgetStatsByCategories ?? [];
    const positive = rows
      .filter((r) =>
        valuesView === "actual" ? r.total > 0 : r.totalEstimated > 0,
      )
      .sort((a, b) => {
        const av = valuesView === "actual" ? a.total : a.totalEstimated;
        const bv = valuesView === "actual" ? b.total : b.totalEstimated;
        return bv - av;
      });
    const sum = positive.reduce(
      (acc, r) =>
        acc + (valuesView === "actual" ? r.total : r.totalEstimated),
      0,
    );
    return positive.map((r, i) => ({
      name: r.categoryName,
      value: valuesView === "actual" ? r.total : r.totalEstimated,
      fill: SLICE_FILLS[i % SLICE_FILLS.length],
      percentOfTotal:
        sum > 0
          ? ((valuesView === "actual" ? r.total : r.totalEstimated) / sum) *
            100
          : 0,
      actualTotal: r.total,
      forecastTotal: r.totalEstimated,
    }));
  }, [budgetStatsByCategories, valuesView]);

  const chartConfig = useMemo(() => {
    const cfg: ChartConfig = {};
    for (const slice of categorySlices) {
      cfg[slice.name] = { label: slice.name, color: slice.fill };
    }
    return cfg;
  }, [categorySlices]);

  const tabTitle =
    lineType === LineTypeEnum.Expense
      ? `${upperFirst(getBudgetLineTypeString(LineTypeEnum.Expense))} par catégorie`
      : `${upperFirst(getBudgetLineTypeString(LineTypeEnum.Income))} par catégorie`;

  const emptyMessage =
    valuesView === "actual"
      ? lineType === LineTypeEnum.Expense
        ? "Aucune dépense réalisée par catégorie pour le moment."
        : "Aucune recette réalisée par catégorie pour le moment."
      : lineType === LineTypeEnum.Expense
        ? "Aucune dépense prévisionnelle par catégorie pour le moment."
        : "Aucune recette prévisionnelle par catégorie pour le moment.";

  const description =
    valuesView === "actual"
      ? lineType === LineTypeEnum.Expense
        ? "Répartition des dépenses réelles par catégorie."
        : "Répartition des recettes réelles par catégorie."
      : lineType === LineTypeEnum.Expense
        ? "Répartition du prévisionnel dépenses par catégorie (quantités × prix unitaire prévus)."
        : "Répartition du prévisionnel recettes par catégorie (quantités × prix unitaire prévus).";

  const detailLink =
    lineType === LineTypeEnum.Expense
      ? { to: "/invoices" as const, label: "Voir les factures" }
      : { to: "/sales" as const, label: "Voir les ventes" };

  return (
    <Card className="flex flex-col">
      <CardHeader className="@container/card flex flex-col gap-4 space-y-0">
        <div className="min-w-0 space-y-2">
          <CardTitle>
            <TypographyH3 className="leading-snug">{tabTitle}</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>{description}</TypographyP>
          </CardDescription>
        </div>

        <div className="bg-muted/40 border-border/80 rounded-xl border p-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:flex lg:flex-1 lg:gap-10">
              <div className="flex min-w-0 flex-col gap-2">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  Type de budget
                </span>
                <Tabs
                  value={lineType}
                  onValueChange={(value) =>
                    setLineType(value as LineTypeEnum)
                  }
                >
                  <TabsList className="flex h-auto w-full flex-wrap gap-1 p-1 sm:w-fit">
                    <TabsTrigger
                      className="grow gap-1.5 sm:grow-0"
                      value={LineTypeEnum.Income}
                    >
                      Recettes
                      <PiggyBank className="size-3.5 opacity-70" aria-hidden />
                    </TabsTrigger>
                    <TabsTrigger
                      className="grow gap-1.5 sm:grow-0"
                      value={LineTypeEnum.Expense}
                    >
                      Dépenses
                      <Coins className="size-3.5 opacity-70" aria-hidden />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
                  Données affichées
                </span>
                <Tabs
                  value={valuesView}
                  onValueChange={(value) =>
                    setValuesView(value as BudgetValuesView)
                  }
                >
                  <TabsList className="flex h-auto w-full flex-wrap gap-1 p-1 sm:w-fit">
                    <TabsTrigger
                      className="grow gap-1.5 sm:grow-0"
                      value="actual"
                    >
                      Réalisé
                    </TabsTrigger>
                    <TabsTrigger
                      className="grow gap-1.5 sm:grow-0"
                      value="forecast"
                    >
                      Prévisionnel
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="border-border/60 flex border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              <Button
                variant="outline"
                size="sm"
                className="w-full gap-1.5 lg:w-auto"
                asChild
              >
                <Link to={detailLink.to}>
                  {detailLink.label}
                  <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="min-h-[220px] w-full rounded-lg sm:aspect-video" />
        ) : categorySlices.length === 0 ? (
          <TypographyP className="text-muted-foreground py-8 text-center text-sm">
            {emptyMessage}
          </TypographyP>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <ChartContainer
              config={chartConfig}
              className={cn(
                "mx-auto aspect-square w-full max-w-[min(100%,280px)]",
                "min-h-[220px] shrink-0 sm:max-w-[300px]",
              )}
            >
              <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) {
                      return null;
                    }
                    const row = payload[0]?.payload as CategorySlice;
                    return (
                      <div className="border-border/50 bg-background grid gap-1 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
                        <span className="font-medium">{row.name}</span>
                        <span className="text-muted-foreground tabular-nums">
                          {valuesView === "actual" ? "Réalisé" : "Prévisionnel"}
                          : {formatPriceToEuros(row.value)} ·{" "}
                          {row.percentOfTotal.toFixed(1)}&nbsp;% du total
                        </span>
                        {(valuesView === "actual"
                          ? row.forecastTotal > 0
                          : row.actualTotal > 0) ? (
                          <span className="text-muted-foreground tabular-nums border-border/60 border-t pt-1">
                            {valuesView === "actual"
                              ? `Prévu : ${formatPriceToEuros(row.forecastTotal)}`
                              : `Réalisé : ${formatPriceToEuros(row.actualTotal)}`}
                          </span>
                        ) : null}
                      </div>
                    );
                  }}
                />
                <Pie
                  animationDuration={300}
                  data={categorySlices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="52%"
                  outerRadius="78%"
                  strokeWidth={2}
                  stroke="var(--background)"
                />
                <ChartLegend
                  verticalAlign="bottom"
                  content={
                    <ChartLegendContent
                      className="flex-wrap gap-x-3 gap-y-2 pt-4"
                      nameKey="name"
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
            <CategoryRecapList
              slices={categorySlices}
              valuesView={valuesView}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CategoryRecapList({
  slices,
  valuesView,
}: {
  slices: CategorySlice[];
  valuesView: BudgetValuesView;
}) {
  return (
    <div className="min-w-0 flex-1 flex flex-col gap-2">
      <TypographyP className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
        Détail par catégorie
      </TypographyP>
      <ul className="flex flex-col gap-2">
        {slices.map((row) => (
          <li
            key={row.name}
            className="flex flex-col gap-0.5 rounded-lg border border-border/80 bg-muted/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: row.fill }}
                aria-hidden
              />
              <span className="font-medium text-sm truncate">{row.name}</span>
            </div>
            <div className="flex flex-col gap-0.5 sm:items-end sm:shrink-0 sm:tabular-nums">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0">
                <span className="text-sm">
                  {formatPriceToEuros(row.value)}
                </span>
                <span className="text-muted-foreground text-xs">
                  {row.percentOfTotal.toFixed(1)}&nbsp;% du total
                </span>
              </div>
              {valuesView === "actual" && row.forecastTotal > 0 ? (
                <span className="text-muted-foreground text-xs">
                  Prévu {formatPriceToEuros(row.forecastTotal)}
                </span>
              ) : null}
              {valuesView === "forecast" && row.actualTotal > 0 ? (
                <span className="text-muted-foreground text-xs">
                  Réalisé {formatPriceToEuros(row.actualTotal)}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
