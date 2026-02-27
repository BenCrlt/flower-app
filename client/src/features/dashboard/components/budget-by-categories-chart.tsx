import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useGetBudgetCategoriesQuery } from "@/features/budget/hooks/useGetBudgetCategoriesQuery";
import { getBudgetLineTypeString } from "@/features/budget/utils";
import { BudgetLinesBudgetLineTypeInput } from "@/generated/graphql";
import { upperFirst } from "lodash";
import { Coins, PiggyBank } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart } from "recharts";

export function BudgetByCategoriesChart() {
  const [lineType, setLineType] = useState<BudgetLinesBudgetLineTypeInput>(
    BudgetLinesBudgetLineTypeInput.Expense,
  );
  const { data: allCategories } = useGetBudgetCategoriesQuery();

  const chartData = allCategories?.budgetCategories.map(({ name }) => ({
    name,
    real: 30,
    estimated: 10,
  }));

  const chartConfig = {
    real: {
      label: "Coût réel",
      color: "#2563eb",
    },
    estimated: {
      label: "Coût estimé",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
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
            onValueChange={(value) =>
              setLineType(value as BudgetLinesBudgetLineTypeInput)
            }
          >
            <TabsList>
              <TabsTrigger value={BudgetLinesBudgetLineTypeInput.Income}>
                Recettes
                <PiggyBank />
              </TabsTrigger>
              <TabsTrigger value={BudgetLinesBudgetLineTypeInput.Expense}>
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
