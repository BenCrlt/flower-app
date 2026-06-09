import { RowPrice } from "@/components/Table/RowPrice";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { SalesTableRow } from "./columns";

interface OrderSalesExpandedRowProps {
  row: SalesTableRow;
}

function SaleLineMobileCard({
  sale,
}: {
  sale: SalesTableRow["sales"][number];
}) {
  return (
    <div className="rounded-md border bg-muted/20 p-3 text-sm">
      <p className="font-medium">{sale.budgetLineName}</p>
      {sale.categoryName ? (
        <Badge
          variant="outline"
          className="mt-1.5"
          style={
            sale.categoryColor
              ? { borderColor: sale.categoryColor }
              : undefined
          }
        >
          {sale.categoryName}
        </Badge>
      ) : null}
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-muted-foreground">
          {sale.quantity} × {formatPriceToEuros(sale.estimatedUnitPrice)}
        </span>
        <RowPrice amount={sale.quantity * sale.estimatedUnitPrice} />
      </div>
    </div>
  );
}

export function OrderSalesExpandedRow({ row }: OrderSalesExpandedRowProps) {
  const isMobile = useIsMobile();

  if (!row.sales.length) {
    return (
      <div className="px-2 py-3 text-sm text-muted-foreground">
        Aucun article sur cette commande.
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <p className="px-1 text-xs font-medium text-muted-foreground">
          {row.sales.length} article{row.sales.length > 1 ? "s" : ""}
        </p>
        {row.sales.map((sale) => (
          <SaleLineMobileCard key={sale.id} sale={sale} />
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Détails de la commande ({row.sales.length} article
          {row.sales.length > 1 ? "s" : ""})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="px-3 py-2 text-left font-medium">Article</th>
              <th className="px-3 py-2 text-left font-medium">Catégorie</th>
              <th className="px-3 py-2 text-right font-medium">Qté</th>
              <th className="px-3 py-2 text-right font-medium">
                Prix unitaire
              </th>
              <th className="px-3 py-2 text-right font-medium">Sous-total</th>
            </tr>
          </thead>
          <tbody>
            {row.sales.map((sale) => (
              <tr key={sale.id} className="border-b last:border-b-0">
                <td className="px-3 py-2">{sale.budgetLineName}</td>
                <td className="px-3 py-2">
                  {sale.categoryName ? (
                    <Badge
                      variant="outline"
                      style={
                        sale.categoryColor
                          ? { borderColor: sale.categoryColor }
                          : undefined
                      }
                    >
                      {sale.categoryName}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-3 py-2 text-right">{sale.quantity}</td>
                <td className="px-3 py-2 text-right">
                  <RowPrice amount={sale.estimatedUnitPrice} />
                </td>
                <td className="px-3 py-2 text-right">
                  <RowPrice amount={sale.quantity * sale.estimatedUnitPrice} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
