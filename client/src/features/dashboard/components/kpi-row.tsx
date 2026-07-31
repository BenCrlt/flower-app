import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import {
  formatGap,
  formatSignedEuros,
  getGapBetweenRealAndPrevisionnal,
  getTextColorForGapFromLineType,
} from "@/features/budget/utils";
import { LineType } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import {
  ArrowDownRight,
  ArrowUpRight,
  Coins,
  PiggyBank,
  Wallet,
} from "lucide-react";
import type { ComponentType, KeyboardEvent } from "react";
import { useState } from "react";
import type { EditionStats } from "../types";

type GapDisplayMode = "percent" | "amount";

interface Props {
  openingBalance: number;
  stats: EditionStats | null | undefined;
  isLoading: boolean;
}

export function KpiRow({ openingBalance, stats, isLoading }: Props) {
  const [incomeGapMode, setIncomeGapMode] = useState<GapDisplayMode>("percent");
  const [expenseGapMode, setExpenseGapMode] =
    useState<GapDisplayMode>("percent");

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatTileSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <KpiTiles
      openingBalance={openingBalance}
      stats={stats}
      incomeGapMode={incomeGapMode}
      onToggleIncomeGapMode={() =>
        setIncomeGapMode((mode) => (mode === "percent" ? "amount" : "percent"))
      }
      expenseGapMode={expenseGapMode}
      onToggleExpenseGapMode={() =>
        setExpenseGapMode((mode) => (mode === "percent" ? "amount" : "percent"))
      }
    />
  );
}

function KpiTiles({
  openingBalance,
  stats,
  incomeGapMode,
  onToggleIncomeGapMode,
  expenseGapMode,
  onToggleExpenseGapMode,
}: {
  openingBalance: number;
  stats: EditionStats;
  incomeGapMode: GapDisplayMode;
  onToggleIncomeGapMode: () => void;
  expenseGapMode: GapDisplayMode;
  onToggleExpenseGapMode: () => void;
}) {
  const netFlow = stats.totalIncome - stats.totalExpense;
  const estimatedBalance = openingBalance + netFlow;
  const netFlowPositive = netFlow >= 0;

  const incomeGapPercent = getGapBetweenRealAndPrevisionnal(
    stats.totalIncome,
    stats.totalPrevisionnalIncome,
    true,
  );
  const incomeColorClassName = getTextColorForGapFromLineType(
    LineType.Income,
    incomeGapPercent,
  );

  const expenseGapPercent = getGapBetweenRealAndPrevisionnal(
    stats.totalExpense,
    stats.totalPrevisionnalExpense,
    true,
  );
  const expenseColorClassName = getTextColorForGapFromLineType(
    LineType.Expense,
    expenseGapPercent,
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatTile
        icon={Wallet}
        label="Solde estimé"
        value={formatPriceToEuros(estimatedBalance)}
        description={`Solde initial ${formatPriceToEuros(openingBalance)}`}
      />
      <StatTile
        icon={PiggyBank}
        label="Recettes réalisées"
        value={formatPriceToEuros(stats.totalIncome)}
        onClick={onToggleIncomeGapMode}
        subtitle={
          incomeGapPercent !== null
            ? {
                text:
                  incomeGapMode === "percent"
                    ? formatGap(incomeGapPercent, true, 0)
                    : formatSignedEuros(
                        stats.totalIncome - stats.totalPrevisionnalIncome,
                      ),
                colorClassName: incomeColorClassName,
              }
            : undefined
        }
      />
      <StatTile
        icon={Coins}
        label="Dépenses réalisées"
        value={formatPriceToEuros(stats.totalExpense)}
        onClick={onToggleExpenseGapMode}
        subtitle={
          expenseGapPercent !== null
            ? {
                text:
                  expenseGapMode === "percent"
                    ? formatGap(expenseGapPercent, true, 0)
                    : formatSignedEuros(
                        stats.totalExpense - stats.totalPrevisionnalExpense,
                      ),
                colorClassName: expenseColorClassName,
              }
            : undefined
        }
      />
      <StatTile
        icon={netFlowPositive ? ArrowUpRight : ArrowDownRight}
        label="Flux net"
        value={`${netFlowPositive ? "+" : "−"}${formatPriceToEuros(Math.abs(netFlow))}`}
        valueClassName={netFlowPositive ? "text-green-600" : "text-red-600"}
        subtitle={
          openingBalance !== 0
            ? {
                text: `${formatGap((netFlow / openingBalance) * 100, true, 0)} du solde initial`,
                colorClassName: netFlowPositive
                  ? "text-green-600"
                  : "text-red-600",
              }
            : undefined
        }
      />
    </div>
  );
}

interface StatTileProps {
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  label: string;
  value: string;
  valueClassName?: string;
  description?: string;
  subtitle?: { text: string; colorClassName?: string };
  onClick?: () => void;
}

function StatTile({
  icon: Icon,
  label,
  value,
  valueClassName,
  description,
  subtitle,
  onClick,
}: StatTileProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      className={cn(
        onClick &&
          "hover:border-primary/40 cursor-pointer transition-colors select-none",
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <CardContent className="flex flex-col gap-2">
        <div className="text-muted-foreground flex items-center gap-2">
          <Icon className="size-4 shrink-0" aria-hidden />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <TypographyH1 className={cn("text-3xl tracking-tight", valueClassName)}>
          {value}
        </TypographyH1>
        {subtitle ? (
          <span
            className={cn(
              "text-sm font-medium",
              subtitle.colorClassName ?? "text-muted-foreground font-normal",
            )}
          >
            {subtitle.text}
          </span>
        ) : description ? (
          <span className="text-muted-foreground text-sm">{description}</span>
        ) : null}
      </CardContent>
    </Card>
  );
}

function StatTileSkeleton() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  );
}
