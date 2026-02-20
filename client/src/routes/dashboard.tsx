import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="h-full">
      <div className="h-full rounded-4xl border bg-background text-card-foreground shadow">
        MON DASHBOARD
      </div>
    </div>
  );
}
