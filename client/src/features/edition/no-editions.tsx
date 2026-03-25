import { TypographyH2, TypographyP } from "@/components/ui/typography";

export function NoEditions() {
  return (
    <div className="w-full max-w-300">
      <TypographyH2>Aucune édition trouvé</TypographyH2>
      <TypographyP>Créez une édition pour commencer.</TypographyP>
    </div>
  );
}
