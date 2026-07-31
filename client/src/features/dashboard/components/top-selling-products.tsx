import { TopProductsCard } from "@/features/sales/components/sales-info/top-products-card";
import { useEdition } from "@/features/edition/EditionContext";
import { useGetOrdersQuery } from "@/features/sales/hooks/getOrdersQuery";
import { useMemo } from "react";

export function TopSellingProducts() {
  const { edition } = useEdition();
  const { data } = useGetOrdersQuery({
    variables: { editionId: edition.id },
  });

  const sales = useMemo(
    () => (data?.orders ?? []).flatMap((order) => order.sales),
    [data?.orders],
  );

  return <TopProductsCard filteredSales={sales} showSalesLink />;
}
