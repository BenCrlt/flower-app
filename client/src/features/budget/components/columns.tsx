import { ColumnDef } from "@tanstack/react-table";

export interface BudgetTableRow {
  name: string;
  description: string;
  estimatedUnitPrice: number;
  estimatedQuantity: number;
  categoryName: string;
}

export const columns: ColumnDef<BudgetTableRow>[] = [
  {
    header: "Nom",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Prix unitaire (prévisionnel)",
    accessorKey: "estimatedUnitPrice",
  },
  {
    header: "Quantité (prévisionnel)",
    accessorKey: "estimatedQuantity",
  },
  {
    header: "Catégorie",
    accessorKey: "categoryName",
  },
];
