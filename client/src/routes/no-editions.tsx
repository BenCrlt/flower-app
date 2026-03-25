import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/no-editions")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full max-w-300">
      <TypographyH2>Aucune édition trouvé</TypographyH2>
      <TypographyP>Créez une édition pour commencer.</TypographyP>
    </div>
  );
}
