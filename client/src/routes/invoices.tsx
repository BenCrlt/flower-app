import { InvoicesTable } from "@/features/payment/components/invoices-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/invoices")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InvoicesTable />;
}
