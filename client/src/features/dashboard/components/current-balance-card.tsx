import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

interface Props {
  openingBalance: number;
  totalIncome: number | null;
  totalExpense: number | null;
  isLoading: boolean;
}

/** Évite NaN si valeur absente ou corrompue (ex. localStorage / parsing réseau). */
function finiteEuroAmount(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function CurrentBalanceCard({
  openingBalance,
  totalIncome,
  totalExpense,
  isLoading,
}: Props) {
  const incomeF = finiteEuroAmount(totalIncome);
  const expenseF = finiteEuroAmount(totalExpense);
  const openingF = finiteEuroAmount(openingBalance);

  if (
    isLoading ||
    incomeF === null ||
    expenseF === null ||
    openingF === null
  ) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            <TypographyH3 className="flex items-center gap-2">
              <Wallet className="size-5 shrink-0 opacity-80" aria-hidden />
              Trésorerie
            </TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>
              Solde initial, flux réalisés et solde estimé.
            </TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-10 w-48" />
          <div className="grid gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 max-w-[85%]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const netFlow = incomeF - expenseF;
  const currentBalance = openingF + netFlow;
  const flowPositive = netFlow >= 0;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <TypographyH3 className="flex items-center gap-2">
            <Wallet className="size-5 shrink-0 opacity-80" aria-hidden />
            Trésorerie
          </TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Solde initial, flux réalisés et solde estimé.
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div>
          <TypographyP className="text-muted-foreground text-sm mb-1">
            Solde estimé (après mouvements réels)
          </TypographyP>
          <TypographyH1 className="tabular-nums tracking-tight">
            {formatPriceToEuros(currentBalance)}
          </TypographyH1>
        </div>
        <dl className="grid gap-3 text-sm border-t border-border pt-4">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground shrink-0">Solde initial</dt>
            <dd className="font-medium tabular-nums text-right">
              {formatPriceToEuros(openingBalance)}
            </dd>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <dt className="text-muted-foreground shrink-0">Flux net</dt>
            <dd
              className={cn(
                "font-medium tabular-nums text-right inline-flex items-center gap-1",
                flowPositive ? "text-green-600" : "text-red-600",
              )}
            >
              {flowPositive ? (
                <ArrowUpRight className="size-4 shrink-0" aria-hidden />
              ) : (
                <ArrowDownRight className="size-4 shrink-0" aria-hidden />
              )}
              {flowPositive ? "+" : "−"}
              {formatPriceToEuros(Math.abs(netFlow))}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
