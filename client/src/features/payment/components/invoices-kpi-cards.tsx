import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { InvoiceStatus } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import type { InvoicesKpi } from "../hooks/useInvoicesPanel";
import { InvoiceStatusBadge } from "./invoice-status-badge";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

interface Props {
  kpi: InvoicesKpi;
  uncoveredLineCount: number;
  uncoveredForecastTotal: number;
  isLoading?: boolean;
  isUncoveredLoading?: boolean;
  onViewUncoveredList: () => void;
}

function formatInvoiceCount(count: number): string {
  return count === 1 ? "1 facture" : `${count} factures`;
}

function formatLineCount(count: number): string {
  return count === 1 ? "1 ligne" : `${count} lignes`;
}

const summaryCardClassName = "flex h-full flex-col";

export function InvoicesKpiCards({
  kpi,
  uncoveredLineCount,
  uncoveredForecastTotal,
  isLoading = false,
  isUncoveredLoading = false,
  onViewUncoveredList,
}: Props) {
  const loading = isLoading || isUncoveredLoading;
  const canOpenUncoveredList = uncoveredLineCount > 0;

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      <Card className={summaryCardClassName}>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>
              <TypographyH3>Payé</TypographyH3>
            </CardTitle>
            <InvoiceStatusBadge status={InvoiceStatus.Paid} />
          </div>
          <CardDescription>
            <TypographyP>Factures réglées (hors annulées).</TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {currencyFormatter.format(kpi.paidAmount)}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {formatInvoiceCount(kpi.paidCount)}
          </p>
        </CardContent>
      </Card>

      <Card className={summaryCardClassName}>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>
              <TypographyH3>En attente</TypographyH3>
            </CardTitle>
            <InvoiceStatusBadge status={InvoiceStatus.Pending} />
          </div>
          <CardDescription>
            <TypographyP>Factures en attente de règlement.</TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {currencyFormatter.format(kpi.pendingAmount)}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {formatInvoiceCount(kpi.pendingCount)}
          </p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          summaryCardClassName,
          canOpenUncoveredList &&
            "cursor-pointer transition-colors hover:bg-muted/50",
        )}
        onClick={canOpenUncoveredList ? () => onViewUncoveredList() : undefined}
        onKeyDown={
          canOpenUncoveredList
            ? (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onViewUncoveredList();
                }
              }
            : undefined
        }
        role={canOpenUncoveredList ? "button" : undefined}
        tabIndex={canOpenUncoveredList ? 0 : undefined}
      >
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>
              <TypographyH3>Dépenses non déclarées</TypographyH3>
            </CardTitle>
            <Badge variant="default">Non déclaré</Badge>
          </div>
          <CardDescription>
            <TypographyP>
              Dépenses rattaché à aucune facture.
              {canOpenUncoveredList ? " Cliquer pour plus de détails." : null}
            </TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {currencyFormatter.format(uncoveredForecastTotal)}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {formatLineCount(uncoveredLineCount)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
