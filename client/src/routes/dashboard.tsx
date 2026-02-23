import { TypographyH2 } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { edition, setEdition } = useEdition();

  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <TypographyH2>Tableau de bord</TypographyH2>
    </div>
  );
}
