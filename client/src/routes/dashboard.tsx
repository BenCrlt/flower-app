import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="h-full">
      <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
        <h1 className="text-xl font-semibold mb-4">Éditions</h1>
      </div>
    </div>
  );
}
