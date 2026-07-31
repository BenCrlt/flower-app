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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { getBudgetLineTypeString } from "@/features/budget/utils";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { Link } from "@tanstack/react-router";
import { upperFirst } from "lodash";
import { ArrowUpRight, Coins, PiggyBank } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useGetBudgetStatsByCategoriesQuery } from "../hooks/useGetBudgetStatsByCategoriesQuery";

const MAX_LABEL_LENGTH = 22;

function truncateLabel(label: string): string {
  return label.length > MAX_LABEL_LENGTH
    ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…`
    : label;
}

function formatCompactEuros(value: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)} €`;
}

type CategoryRow = {
  name: string;
  real: number;
  forecast: number;
};

const chartConfig = {
  real: { label: "Réel", color: "var(--primary)" },
  forecast: {
    label: "Prévisionnel",
    color: "color-mix(in srgb, var(--primary) 40%, transparent)",
  },
} satisfies ChartConfig;

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

  const categoryRows: CategoryRow[] = useMemo(() => {
    const rows = budgetStatsByCategories?.getBudgetStatsByCategories ?? [];
    return rows
      .filter((r) => r.total > 0 || r.totalEstimated > 0)
      .sort(
        (a, b) =>
          Math.max(b.total, b.totalEstimated) -
          Math.max(a.total, a.totalEstimated),
      )
      .map((r) => ({
        name: r.categoryName,
        real: r.total,
        forecast: r.totalEstimated,
      }));
  }, [budgetStatsByCategories]);

  const chartHeight = Math.max(220, categoryRows.length * 52 + 32);

  const tabTitle =
    lineType === LineTypeEnum.Expense
      ? `${upperFirst(getBudgetLineTypeString(LineTypeEnum.Expense))} par catégorie`
      : `${upperFirst(getBudgetLineTypeString(LineTypeEnum.Income))} par catégorie`;

  const emptyMessage =
    lineType === LineTypeEnum.Expense
      ? "Aucune dépense (réalisée ou prévisionnelle) par catégorie pour le moment."
      : "Aucune recette (réalisée ou prévisionnelle) par catégorie pour le moment.";

  const description =
    lineType === LineTypeEnum.Expense
      ? "Dépenses réelles et prévisionnelles par catégorie."
      : "Recettes réelles et prévisionnelles par catégorie.";

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <TypographyH3 className="leading-snug">{tabTitle}</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>{description}</TypographyP>
        </CardDescription>
        <CardAction className="flex flex-wrap items-center gap-2">
          <Tabs
            value={lineType}
            onValueChange={(value) => setLineType(value as LineTypeEnum)}
          >
            <TabsList>
              <TabsTrigger value={LineTypeEnum.Income} className="gap-1.5">
                Recettes
                <PiggyBank className="size-3.5 opacity-70" aria-hidden />
              </TabsTrigger>
              <TabsTrigger value={LineTypeEnum.Expense} className="gap-1.5">
                Dépenses
                <Coins className="size-3.5 opacity-70" aria-hidden />
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link to="/budget-table">
              Voir le budget
              <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="min-h-[220px] w-full rounded-lg" />
        ) : categoryRows.length === 0 ? (
          <TypographyP className="text-muted-foreground py-8 text-center text-sm">
            {emptyMessage}
          </TypographyP>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto w-full"
            style={{ height: chartHeight }}
          >
            <BarChart
              accessibilityLayer
              data={categoryRows}
              layout="vertical"
              margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
            >
              <CartesianGrid horizontal={false} />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCompactEuros}
              />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                width={150}
                tickFormatter={truncateLabel}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {name === "real" ? "Réel" : "Prévisionnel"}
                        </span>
                        <span className="text-foreground font-medium tabular-nums">
                          {formatPriceToEuros(Number(value))}
                        </span>
                      </div>
                    )}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="real"
                fill="var(--color-real)"
                radius={4}
                maxBarSize={20}
              />
              <Bar
                dataKey="forecast"
                fill="var(--color-forecast)"
                radius={4}
                maxBarSize={20}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
