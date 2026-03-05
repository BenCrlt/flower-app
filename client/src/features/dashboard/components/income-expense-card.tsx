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
import { LineTypeEnum } from "@/generated/graphql";
import { AmountProgress } from "./amount-progress";

export function IncomeExpenseCard() {
  const { edition } = useEdition();
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Aperçu du budget</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Visualisez si vos prévisions sont respectées.
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AmountProgress
          title="Recettes"
          value={null}
          max={edition.totalPrevisionnalIncome}
          lineType={LineTypeEnum.Income}
        />
        <Separator />
        <AmountProgress
          title="Dépenses"
          value={edition.totalExpense}
          max={edition.totalPrevisionnalExpense}
          lineType={LineTypeEnum.Expense}
        />
      </CardContent>
    </Card>
  );
}
