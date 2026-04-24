import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3, TypographyP } from "@/components/ui/typography";

export const OrderOriginsCard = () => {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Points de ventes</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>Ajouter ou supprimer des points de ventes</TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col"></CardContent>
    </Card>
  );
};
