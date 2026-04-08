import { ProductsTable } from "@/features/sales/components/products-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductsTable />;
}
