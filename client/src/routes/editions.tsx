import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editions")({
  component: EditionsPage,
});

function EditionsPage() {
  return (
    <div className="h-full rounded-4xl border bg-background text-card-foreground shadow p-6">
      <h1>Gestion des éditions</h1>
      <p>Aucune édition n&apos;est définie. Créez une édition pour accéder au dashboard et au budget.</p>
    </div>
  );
}
