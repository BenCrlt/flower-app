import { EditionDashboard } from "@/features/dashboard/components/edition-dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <EditionDashboard />
    </div>
  );
}
