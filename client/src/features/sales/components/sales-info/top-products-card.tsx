import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetOrdersQuery } from "@/generated/graphql";
import { useMemo } from "react";

const TOP_PRODUCTS_LIMIT = 5;

interface Props {
  filteredSales: GetOrdersQuery["orders"][number]["sales"];
}

export const TopProductsCard = ({ filteredSales }: Props) => {
  const topProducts = useMemo(() => {
    const salesCountByProducts = new Map<number, number>();
    const budgetLineNameById = new Map<number, string>();
    filteredSales.forEach((sale) => {
      salesCountByProducts.set(
        sale.budgetLineId,
        (salesCountByProducts.get(sale.budgetLineId) || 0) + sale.quantity,
      );
      if (sale.budgetLine?.name) {
        budgetLineNameById.set(sale.budgetLineId, sale.budgetLine.name);
      }
    });
    return Array.from(salesCountByProducts.entries())
      .map(([budgetLineId, quantity]) => ({
        budgetLineId,
        quantity,
        name:
          budgetLineNameById.get(budgetLineId) || `Produit #${budgetLineId}`,
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, TOP_PRODUCTS_LIMIT);
  }, [filteredSales]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produits les plus vendus</CardTitle>
        <CardDescription>
          Classement calculé à partir des commandes filtrées.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topProducts.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            Aucun produit pour ce filtre.
          </p>
        ) : (
          <ul className="space-y-3">
            {topProducts.map((product, index) => (
              <li
                key={product.budgetLineId}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="truncate">
                  {index + 1}. {product.name}
                </span>
                <span className="font-semibold">{product.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
