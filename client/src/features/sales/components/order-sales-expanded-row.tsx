import { RowPrice } from "@/components/Table/RowPrice";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesTableRow } from "./columns";

interface OrderSalesExpandedRowProps {
  row: SalesTableRow;
}

export function OrderSalesExpandedRow({ row }: OrderSalesExpandedRowProps) {
  if (!row.sales.length) {
    return (
      <div className="px-2 py-3 text-sm text-muted-foreground">
        Aucun article sur cette commande.
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
