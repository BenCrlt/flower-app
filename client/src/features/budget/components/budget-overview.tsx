import { CategoryBadge } from "@/components/CategoryBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { LineTypeEnum } from "@/generated/graphql";
import { ReceiptText } from "lucide-react";
import { useState } from "react";
import {
  formatGap,
  formatSignedEuros,
  getEstimatedAmount,
  isUnplannedLine,
} from "../utils";
import { BudgetTableRow } from "./columns";
import { formatPriceToEuros } from "@/utils/PriceUtils";

function getGapColor(lineType: LineTypeEnum, gap: number | null) {
  if (gap === null || gap === 0) {
    return "text-muted-foreground";
  }

  if (lineType === LineTypeEnum.Income) {
    return gap > 0 ? "text-green-600" : "text-red-600";
  }

  return gap > 0 ? "text-red-600" : "text-green-600";
}

function formatOverviewGap(
  gapInEuros: number,
  estimatedTotal: number,
  showGapInPercent: boolean,
) {
  if (!showGapInPercent) {
    return formatSignedEuros(gapInEuros);
  }

  const gapInPercent =
    estimatedTotal === 0
      ? gapInEuros > 0
        ? 100
        : 0
      : (gapInEuros / estimatedTotal) * 100;

  return formatGap(gapInPercent, true, 0);
}

export function BudgetOverview({
  rows,
  lineType,
  showGapInPercent,
}: {
  rows: BudgetTableRow[];
  lineType: LineTypeEnum;
  showGapInPercent: boolean;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const estimatedTotal = rows.reduce(
    (total, row) => total + getEstimatedAmount(row),
    0,
  );
  const realTotal = rows.reduce((total, row) => total + (row.realCost ?? 0), 0);
  const gapInEuros = realTotal - estimatedTotal;
  const unplannedLines = rows.filter(isUnplannedLine);
  const unplannedTotal = unplannedLines.reduce(
    (total, row) => total + (row.realCost ?? 0),
    0,
  );
  const overviewLabel =
    lineType === LineTypeEnum.Income ? "recettes" : "dépenses";
  const gapColor = getGapColor(lineType, gapInEuros);

  return (
    <>
      <Card className="gap-5 rounded-lg pt-0">
        <CardHeader className="border-b pt-5">
          <div>
            <CardTitle>Vue d'ensemble des {overviewLabel}</CardTitle>
            <CardDescription>
              {rows.length} ligne{rows.length > 1 ? "s" : ""} suivie
              {rows.length > 1 ? "s" : ""} pour cette édition
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <dl className="grid overflow-hidden rounded-md border bg-muted/20 sm:grid-cols-3">
            <div className="border-b px-4 py-3 sm:border-r sm:border-b-0">
              <dt className="text-sm text-muted-foreground">Prévu</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">
                {formatPriceToEuros(estimatedTotal)}
              </dd>
            </div>
            <div className="border-b px-4 py-3 sm:border-r sm:border-b-0">
              <dt className="text-sm text-muted-foreground">Réel</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">
                {formatPriceToEuros(realTotal)}
              </dd>
            </div>
            <div className="px-4 py-3">
              <dt className="text-sm text-muted-foreground">Écart</dt>
              <dd
                className={`mt-1 text-xl font-semibold tabular-nums ${gapColor}`}
              >
                {formatOverviewGap(
                  gapInEuros,
                  estimatedTotal,
                  showGapInPercent,
                )}
              </dd>
            </div>
          </dl>

          <button
            type="button"
            className="flex w-full flex-col gap-3 rounded-md border border-dashed bg-background px-4 py-3 text-left transition-colors hover:bg-muted/50 disabled:cursor-default disabled:hover:bg-background sm:flex-row sm:items-center sm:justify-between"
            onClick={() => setDetailOpen(true)}
            disabled={!unplannedLines.length}
          >
            <span className="flex items-start gap-3">
              <span className="rounded-md bg-primary/10 p-2 text-primary">
                <ReceiptText className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-medium">
                  {unplannedLines.length
                    ? `${unplannedLines.length} ligne${unplannedLines.length > 1 ? "s" : ""} non prévue${unplannedLines.length > 1 ? "s" : ""}`
                    : "Aucune ligne non prévue"}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {unplannedLines.length
                    ? "Cliquez pour consulter le détail"
                    : "Toutes les lignes réelles ont une prévision associée"}
                </span>
              </span>
            </span>
            {unplannedLines.length ? (
              <span className="text-lg font-semibold tabular-nums">
                {formatPriceToEuros(unplannedTotal)}
              </span>
            ) : null}
          </button>
        </CardContent>
      </Card>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lignes non prévues</DialogTitle>
            <DialogDescription>
              Dépenses ou recettes réelles sans montant prévisionnel.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            {[...unplannedLines]
              .sort((a, b) => (b.realCost ?? 0) - (a.realCost ?? 0))
              .map((row) => {
                const realAmount = row.realCost ?? 0;
                const share =
                  unplannedTotal > 0
                    ? Math.min((realAmount / unplannedTotal) * 100, 100)
                    : 0;

                return (
                  <div key={row.id} className="rounded-md border p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{row.name}</p>
                        {row.categoryName ? (
                          <CategoryBadge
                            name={row.categoryName}
                            color={row.categoryColor}
                            className="mt-2"
                          />
                        ) : null}
                      </div>
                      <div className="text-right font-semibold tabular-nums">
                        {formatPriceToEuros(realAmount)}
                      </div>
                    </div>
                    <Progress value={share} className="mt-3 h-2" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {Math.round(share)}% du total non prévu
                    </p>
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
