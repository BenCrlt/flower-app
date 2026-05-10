import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
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

type CategorySlice = {
  name: string;
  value: number;
  fill: string;
  percentOfTotal: number;
};

export function BudgetByCategoriesChart() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<LineTypeEnum>(LineTypeEnum.Expense);
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
      .filter((r) => r.total > 0)
      .sort((a, b) => b.total - a.total);
    const sum = positive.reduce((acc, r) => acc + r.total, 0);
    return positive.map((r, i) => ({
      name: r.categoryName,
      value: r.total,
      fill: SLICE_FILLS[i % SLICE_FILLS.length],
      percentOfTotal: sum > 0 ? (r.total / sum) * 100 : 0,
    }));
  }, [budgetStatsByCategories]);

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
    lineType === LineTypeEnum.Expense
      ? "Aucune dépense réalisée par catégorie pour le moment."
      : "Aucune recette réalisée par catégorie pour le moment.";

  const description =
    lineType === LineTypeEnum.Expense
      ? "Répartition des dépenses réelles par catégorie."
      : "Répartition des recettes réelles par catégorie.";

  const detailLink =
    lineType === LineTypeEnum.Expense
      ? { to: "/invoices" as const, label: "Voir les factures" }
      : { to: "/sales" as const, label: "Voir les ventes" };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col gap-4 space-y-0 @container/card">
        <div className="flex flex-col gap-1 min-w-0">
          <CardTitle>
            <TypographyH3 className="leading-snug">{tabTitle}</TypographyH3>
          </CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <TypographyP>{description}</TypographyP>
            <Button variant="link" className="h-auto w-fit justify-start gap-1 p-0 text-sm" asChild>
              <Link to={detailLink.to}>
                {detailLink.label}
                <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />
              </Link>
            </Button>
          </CardDescription>
        </div>
        <CardAction className="self-stretch sm:self-end w-full sm:w-auto">
          <Tabs
            value={lineType}
            onValueChange={(value) => setLineType(value as LineTypeEnum)}
          >
            <TabsList className="flex w-full flex-wrap gap-1 h-auto p-1 sm:w-auto">
              <TabsTrigger
                className="grow sm:grow-0 gap-1.5"
                value={LineTypeEnum.Income}
              >
                Recettes
                <PiggyBank className="size-3.5 opacity-70" aria-hidden />
              </TabsTrigger>
              <TabsTrigger
                className="grow sm:grow-0 gap-1.5"
                value={LineTypeEnum.Expense}
              >
                Dépenses
                <Coins className="size-3.5 opacity-70" aria-hidden />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
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
                          {formatPriceToEuros(row.value)} ·{" "}
                          {row.percentOfTotal.toFixed(1)}&nbsp;% du total
                        </span>
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
            <CategoryRecapList slices={categorySlices} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CategoryRecapList({ slices }: { slices: CategorySlice[] }) {
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
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0 sm:shrink-0 sm:tabular-nums">
              <span className="text-sm">{formatPriceToEuros(row.value)}</span>
              <span className="text-muted-foreground text-xs">
                {row.percentOfTotal.toFixed(1)}&nbsp;% du total
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
