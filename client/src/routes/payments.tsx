import { PaymentsTable } from "@/features/payment/components/payments-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/payments")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <PaymentsTable />
    </div>
  );
}
