import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { useEdition } from "@/features/edition/EditionContext";
import { AmountProgress } from "./amount-progress";

export function IncomeExpenseCard() {
  const { edition } = useEdition();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <TypographyH3>Aperçu du budget</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>Résumé des revenus et dépenses.</TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <AmountProgress
          title="Recettes"
          value={20}
          max={edition.totalPrevisionnalIncome}
        />
        <Separator />
        <AmountProgress
          title="Dépenses"
          value={50}
          max={edition.totalPrevisionnalExpense}
        />
      </CardContent>
    </Card>
  );
}
