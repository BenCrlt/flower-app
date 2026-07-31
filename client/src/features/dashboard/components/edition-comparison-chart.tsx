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
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useGetEditionsComparisonQuery } from "../hooks/useGetEditionsComparisonQuery";

const chartConfig = {
  totalIncome: { label: "Recettes", color: "var(--chart-1)" },
  totalExpense: { label: "Dépenses", color: "var(--chart-2)" },
} satisfies ChartConfig;

function formatCompactEuros(value: number): string {
  return `${new Intl.NumberFormat("fr-FR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)} €`;
}

export function EditionComparisonChart() {
  const { data, isPending } = useGetEditionsComparisonQuery();

  const editionRows = useMemo(() => {
    return [...(data?.editions ?? [])].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
  }, [data?.editions]);

  if (!isPending && editionRows.length < 2) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Comparaison des éditions</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Recettes et dépenses réalisées, édition par édition.
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Skeleton className="h-[260px] w-full rounded-lg" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <BarChart
              accessibilityLayer
              data={editionRows}
              margin={{ top: 4, right: 8, bottom: 4, left: 8 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={56}
                tickFormatter={formatCompactEuros}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) => (
                      <div className="flex w-full items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {name === "totalIncome" ? "Recettes" : "Dépenses"}
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
                dataKey="totalIncome"
                fill="var(--color-totalIncome)"
                radius={4}
                maxBarSize={32}
              />
              <Bar
                dataKey="totalExpense"
                fill="var(--color-totalExpense)"
                radius={4}
                maxBarSize={32}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
