import { SalesPanel } from "@/features/sales/components/sales-panel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sales")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SalesPanel />;
}
