import { InvoicesTable } from "@/features/payment/components/invoices-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/invoices")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <InvoicesTable />
    </div>
  );
}
