import { SettingsPanel } from "@/features/settings/settings-panel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsPanel />;
}
