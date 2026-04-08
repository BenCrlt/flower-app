import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { useMemo } from "react";
import { useGetProductsQuery } from "../hooks/useGetProductsQuery";
import { getColumns, ProductTableRow } from "./columns";

export function ProductsTable() {
  const { edition } = useEdition();

  const { data } = useGetProductsQuery({
    variables: {
      editionId: edition.id,
    },
  });

  const rows = useMemo<ProductTableRow[]>(
    () =>
      data?.products.map((item) => ({
        id: item.id,
        name: item.name,
        unitPrice: Number(item.unitPrice),
      })) || [],
    [data],
  );

  const columns = getColumns();

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Produits</TypographyH2>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
