import { CategoryBadge } from "@/components/CategoryBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BudgetCategoriesItem,
  BudgetLinesItem,
  GetOrdersQuery,
} from "@/generated/graphql";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { Package } from "lucide-react";
import { useMemo } from "react";

const TOP_PRODUCTS_LIMIT = 5;

interface Props {
  filteredSales: GetOrdersQuery["orders"][number]["sales"];
}

type BudgetLineMeta = Pick<BudgetLinesItem, "name" | "estimatedUnitPrice"> & {
  category?: Pick<BudgetCategoriesItem, "id" | "name" | "color"> | null;
};

function RankBadge({ rank }: { rank: number }) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums",
        rank === 1 &&
          "bg-amber-500/15 text-amber-800 ring-1 ring-amber-500/25 dark:text-amber-300",
        rank === 2 &&
          "bg-slate-500/12 text-slate-800 ring-1 ring-slate-500/20 dark:text-slate-200",
        rank === 3 &&
          "bg-orange-500/12 text-orange-900 ring-1 ring-orange-500/20 dark:text-orange-200",
        rank > 3 && "bg-muted text-muted-foreground",
      )}
      aria-hidden
    >
      {rank}
    </div>
  );
}

export const TopProductsCard = ({ filteredSales }: Props) => {
  const topProducts = useMemo(() => {
    const salesCountByProducts = new Map<number, number>();
    const budgetLineById = new Map<number, BudgetLineMeta>();

    filteredSales.forEach((sale) => {
      salesCountByProducts.set(
        sale.budgetLineId,
        (salesCountByProducts.get(sale.budgetLineId) || 0) + sale.quantity,
      );
      if (sale.budgetLine) {
        const existing = budgetLineById.get(sale.budgetLineId);
        budgetLineById.set(sale.budgetLineId, {
          name: sale.budgetLine.name,
          estimatedUnitPrice: sale.budgetLine.estimatedUnitPrice,
          category: sale.budgetLine.category ?? existing?.category ?? null,
        });
      }
    });

    const sorted = Array.from(salesCountByProducts.entries())
      .map(([budgetLineId, quantity]) => {
        const meta = budgetLineById.get(budgetLineId);
        const unit = Number(meta?.estimatedUnitPrice ?? 0);
        return {
          budgetLineId,
          quantity,
          name: meta?.name ?? `Produit #${budgetLineId}`,
          totalPrice: unit * quantity,
          category: meta?.category ?? null,
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, TOP_PRODUCTS_LIMIT);

    return sorted;
  }, [filteredSales]);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-lg">Produits les plus vendus</CardTitle>
        <CardDescription>
          Top {TOP_PRODUCTS_LIMIT} par quantité sur les commandes filtrées.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        {topProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Package className="size-6 text-muted-foreground" aria-hidden />
            </div>
            <p className="text-sm font-medium text-foreground">
              Aucun produit pour ce filtre
            </p>
            <p className="max-w-[220px] text-xs text-muted-foreground">
              Ajustez la période ou les catégories pour voir le classement.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {topProducts.map((product, index) => {
              const rank = index + 1;

              return (
                <li key={product.budgetLineId}>
                  <div
                    className={cn(
                      "rounded-xl border bg-card p-3 shadow-sm transition-colors",
                      "hover:border-primary/20 hover:bg-muted/25",
                    )}
                  >
                    <div className="flex gap-3">
                      <RankBadge rank={rank} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <div className="min-w-0 space-y-1">
                            <p className="truncate font-medium leading-tight text-foreground">
                              {product.name}
                            </p>
                            {product.category ? (
                              <CategoryBadge
                                name={product.category.name}
                                color={product.category.color}
                              />
                            ) : null}
                          </div>
                          <div className="flex shrink-0 flex-col items-start gap-0.5 sm:items-end">
                            <span className="text-sm tabular-nums text-muted-foreground">
                              <span className="font-semibold text-foreground">
                                {product.quantity}
                              </span>{" "}
                              vendu{product.quantity > 1 ? "s" : ""}
                            </span>
                            <span className="text-sm font-semibold tabular-nums text-foreground">
                              {formatPriceToEuros(product.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
