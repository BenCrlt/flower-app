import { InvoicesPanel } from "@/features/payment/components/invoices-panel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/invoices")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InvoicesPanel />;
}
