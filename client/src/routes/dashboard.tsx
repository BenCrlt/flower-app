import { EditionDashboard } from "@/features/dashboard/components/edition-dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  return <EditionDashboard />;
}
