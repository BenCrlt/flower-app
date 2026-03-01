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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { getBudgetLineTypeString } from "@/features/budget/utils";
import { useEdition } from "@/features/edition/EditionContext";
import { LineTypeEnum } from "@/generated/graphql";
import { upperFirst } from "lodash";
import { Coins, PiggyBank } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { useGetBudgetStatsByCategoriesQuery } from "../hooks/useGetBudgetStatsByCategoriesQuery";

export function BudgetByCategoriesChart() {
  const { edition } = useEdition();
  const [lineType, setLineType] = useState<LineTypeEnum>(LineTypeEnum.Expense);
  const { data: budgetStatsByCategories } = useGetBudgetStatsByCategoriesQuery({
    variables: {
      editionId: edition.id,
      lineType,
    },
  });

  const chartData =
    budgetStatsByCategories?.getBudgetStatsByCategories.map(
      ({ categoryName, total, totalEstimated }) => ({
        name: categoryName,
        real: total,
        estimated: totalEstimated,
      }),
    ) || [];

  const chartConfig = {
    real: {
      label: "Coût réel",
      color: "var(--primary)",
    },
    estimated: {
      label: "Coût estimé",
      color: "color-mix(in srgb, var(--primary), transparent 60%)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <TypographyH3>
            {upperFirst(getBudgetLineTypeString(lineType))} par catégorie
          </TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Retrouvez le détail des dépenses et des recettes par catégorie.
          </TypographyP>
        </CardDescription>
        <CardAction>
          <Tabs
            defaultValue="expense"
            onValueChange={(value) => setLineType(value as LineTypeEnum)}
          >
            <TabsList>
              <TabsTrigger value={LineTypeEnum.Income}>
                Recettes
                <PiggyBank />
              </TabsTrigger>
              <TabsTrigger value={LineTypeEnum.Expense}>
                Dépenses
                <Coins />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="real" fill="var(--color-real)" radius={10} />
            <Bar
              dataKey="estimated"
              fill="var(--color-estimated)"
              radius={10}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
