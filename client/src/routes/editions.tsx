import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editions")({
  component: EditionsPage,
});

function EditionsPage() {
  return <div>Gestion des éditions</div>;
}
