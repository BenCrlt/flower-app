import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { LineTypeEnum } from "@/generated/graphql";
import { AmountProgress } from "./amount-progress";
import { EditionStats } from "./edition-dashboard";

interface Props {
  edition: EditionStats | null | undefined;
  isLoading?: boolean;
}

export function IncomeExpenseCard({ edition, isLoading = false }: Props) {
  const showSkeleton = isLoading || !edition;
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
        {showSkeleton ? (
          <>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-20 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-20 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </>
        ) : (
          <>
            <AmountProgress
              title="Recettes"
              value={0}
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
