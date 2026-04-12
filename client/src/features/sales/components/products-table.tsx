import { DataTable } from "@/components/Table/DataTable";
import { TypographyH2 } from "@/components/ui/typography";
import { useMemo } from "react";
import { getColumns, ProductTableRow } from "./columns";

export function ProductsTable() {
  const rows = useMemo<ProductTableRow[]>(() => [], []);

  const columns = getColumns();

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Produits</TypographyH2>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
