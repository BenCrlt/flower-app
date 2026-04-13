import { SalesTable } from "@/features/sales/components/orders-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SalesTable />;
}
