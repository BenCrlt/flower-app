import { CategoryBadge } from "@/components/CategoryBadge";
import { StrictDateRange } from "@/components/date-picker";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BudgetCategoriesItem, GetOrdersQuery } from "@/generated/graphql";
import { getSaleLineTotal } from "../../utils/salePrice";
import { formatTimestampToLocaleString } from "@/utils/DateUtils";
import {
  differenceInDays,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  format,
  roundToNearestMinutes,
  startOfDay,
} from "date-fns";
import { ListFilter } from "lucide-react";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

interface Props {
  filteredSales: GetOrdersQuery["orders"][number]["sales"];
  selectedCategoryIds: number[];
  categoryOptions: Pick<BudgetCategoriesItem, "id" | "name" | "color">[];
  handleSelectCategory: (categoryId: number, checked: boolean) => void;
  range: StrictDateRange;
}

export const SalesChart = ({
  filteredSales,
  selectedCategoryIds,
  categoryOptions,
  handleSelectCategory,
  range,
}: Props) => {
  const totalFilteredSalesAmount = useMemo(() => {
    return filteredSales.reduce((sum, sale) => sum + getSaleLineTotal(sale), 0);
  }, [filteredSales]);

  const isDailyBuckets = differenceInDays(range.to, range.from) >= 3;

  const data = useMemo(() => {
    const isHourlyDisplay = !isDailyBuckets;
    if (isHourlyDisplay) {
      const thirtyMinutesIntervals = eachMinuteOfInterval(
        {
          start: startOfDay(range.from),
          end: endOfDay(range.to),
        },
        { step: 30 },
      );

      const salesByInterval = new Map<string, number>();
      filteredSales.forEach((sale) => {
        const intervalKey = roundToNearestMinutes(
          new Date(
            formatTimestampToLocaleString(sale.executedAt, "yyyy-MM-dd HH:mm"),
          ),
          { roundingMethod: "ceil", nearestTo: 30 },
        ).toISOString();
        const currentSales = salesByInterval.get(intervalKey) || 0;
        salesByInterval.set(intervalKey, currentSales + sale.quantity);
      });

      return thirtyMinutesIntervals.map((date) => {
        const intervalKey = date.toISOString();
        const totalSales = salesByInterval.get(intervalKey) || 0;
        return {
          label: format(date, "HH:mm"),
          totalAmount: totalSales,
        };
      });
    }

    const days = eachDayOfInterval({
      start: range.from,
      end: range.to,
    });

    const salesByDay = new Map<string, number>();

    filteredSales.forEach((sale) => {
      const dayKey = formatTimestampToLocaleString(
        sale.executedAt,
        "yyyy-MM-dd",
      );
      const currentSales = salesByDay.get(dayKey) || 0;
      salesByDay.set(dayKey, currentSales + sale.quantity);
    });

    return days.map((day) => {
      const dayKey = format(day, "yyyy-MM-dd");
      const totalSales = salesByDay.get(dayKey) || 0;
      return {
        label: format(day, "dd/MM"),
        totalAmount: totalSales,
      };
    });
  }, [filteredSales, range, isDailyBuckets]);

  const chartConfig = {
    totalAmount: {
      label: "Ventes",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full min-h-0">
      <CardHeader className="shrink-0">
        <CardTitle>Evolution des ventes</CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={selectedCategoryIds.length ? "default" : "outline"}
                className={"border-dashed"}
              >
                <ListFilter />
                Catégories{" "}
                {selectedCategoryIds.length
                  ? `(${selectedCategoryIds.length})`
                  : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                {categoryOptions.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.id}
                    className="capitalize"
                    checked={selectedCategoryIds.includes(category.id)}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={(value) =>
                      handleSelectCategory(category.id, value)
                    }
                  >
                    <CategoryBadge
                      name={category.name}
                      color={category.color}
                    />
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <CardDescription>
          Total filtré :{" "}
          {new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
          }).format(totalFilteredSalesAmount)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full max-w-full justify-center"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 12, right: 16, bottom: 8, left: 8 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              width={48}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="totalAmount"
              stroke="var(--color-totalAmount)"
              fill="var(--color-totalAmount)"
              fillOpacity={0.35}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
