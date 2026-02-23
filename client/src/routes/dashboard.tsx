import { useEdition } from "@/features/edition/EditionContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { edition, setEdition } = useEdition();

  return (
    <div className="h-full">
      <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6"></div>
    </div>
  );
}
