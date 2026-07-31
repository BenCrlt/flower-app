import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useGetBudgetLinesQuery } from "@/features/budget/hooks/useGetBudgetLinesQuery";
import { useEdition } from "@/features/edition/EditionContext";
import { UncoveredBudgetLinesSheet } from "@/features/payment/components/uncovered-budget-lines-sheet";
import { useGetInvoicesQuery } from "@/features/payment/hooks/useGetInvoicesQuery";
import { mapUncoveredBudgetLines } from "@/features/payment/hooks/useInvoicesPanel";
import { getStatusColor, getStatusText } from "@/features/payment/utils";
import { InvoiceStatus, LineTypeEnum } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState, type KeyboardEvent } from "react";

interface StatusSummary {
  status: InvoiceStatus;
  count: number;
  amount: number;
}

const STATUS_ORDER = [
  InvoiceStatus.Pending,
  InvoiceStatus.Paid,
  InvoiceStatus.Cancelled,
] as const;

export function InvoiceStatusSummary() {
  const { edition } = useEdition();
  const [uncoveredSheetOpen, setUncoveredSheetOpen] = useState(false);

  const { data, isPending } = useGetInvoicesQuery({
    variables: { editionId: edition.id },
  });
  const { data: budgetLinesData, isPending: isBudgetLinesPending } =
    useGetBudgetLinesQuery({
      variables: {
        editionId: edition.id,
        budgetLineType: LineTypeEnum.Expense,
      },
    });

  const summaries: StatusSummary[] = useMemo(() => {
    const invoices = data?.invoices ?? [];
    return STATUS_ORDER.map((status) => {
      const matching = invoices.filter(
        (invoice) => (invoice.status as unknown as InvoiceStatus) === status,
      );
      return {
        status,
        count: matching.length,
        amount: matching.reduce(
          (acc, invoice) => acc + Number(invoice.totalAmount),
          0,
        ),
      };
    });
  }, [data?.invoices]);

  const uncoveredBudgetLines = useMemo(() => {
    const invoices = data?.invoices ?? [];
    const budgetLineIdsWithPayment = new Set(
      invoices.flatMap((invoice) =>
        invoice.payments.map((payment) => payment.budgetLineId),
      ),
    );
    return mapUncoveredBudgetLines(
      budgetLinesData?.budgetLines ?? [],
      budgetLineIdsWithPayment,
    );
  }, [data?.invoices, budgetLinesData?.budgetLines]);

  const uncoveredForecastTotal = uncoveredBudgetLines.reduce(
    (acc, line) => acc + line.forecastAmount,
    0,
  );
  const canOpenUncoveredList = uncoveredBudgetLines.length > 0;
  const isUncoveredLoading = isPending || isBudgetLinesPending;

  const handleUncoveredKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!canOpenUncoveredList) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setUncoveredSheetOpen(true);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Statut des factures</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>Résumé des factures de l'édition.</TypographyP>
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm" className="gap-1.5" asChild>
            <Link to="/invoices">
              Voir les factures
              <ArrowUpRight className="size-3.5 opacity-80" aria-hidden />
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {isUncoveredLoading ? (
            <Skeleton className="h-20 w-full rounded-lg" />
          ) : (
            <div
              role={canOpenUncoveredList ? "button" : undefined}
              tabIndex={canOpenUncoveredList ? 0 : undefined}
              onClick={
                canOpenUncoveredList
                  ? () => setUncoveredSheetOpen(true)
                  : undefined
              }
              onKeyDown={
                canOpenUncoveredList ? handleUncoveredKeyDown : undefined
              }
              className={cn(
                "border-border/80 bg-muted/30 flex items-center justify-between gap-3 rounded-lg border px-4 py-4",
                canOpenUncoveredList &&
                  "cursor-pointer transition-colors hover:bg-muted/50",
              )}
            >
              <Badge variant="default" className="w-fit">
                Non déclaré
              </Badge>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold tracking-tight tabular-nums">
                  {formatPriceToEuros(uncoveredForecastTotal)}
                </span>
                <span className="text-muted-foreground text-sm">
                  {uncoveredBudgetLines.length} ligne
                  {uncoveredBudgetLines.length > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}
          {isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-20 w-full rounded-lg" />
              ))
            : summaries.map((summary) => (
                <div
                  key={summary.status}
                  className="border-border/80 bg-muted/30 flex items-center justify-between gap-3 rounded-lg border px-4 py-4"
                >
                  <Badge
                    variant={getStatusColor(summary.status)}
                    className="w-fit"
                  >
                    {getStatusText(summary.status)}
                  </Badge>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tracking-tight tabular-nums">
                      {formatPriceToEuros(summary.amount)}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {summary.count} facture{summary.count > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
      <UncoveredBudgetLinesSheet
        open={uncoveredSheetOpen}
        onOpenChange={setUncoveredSheetOpen}
        lines={uncoveredBudgetLines}
      />
    </Card>
  );
}
