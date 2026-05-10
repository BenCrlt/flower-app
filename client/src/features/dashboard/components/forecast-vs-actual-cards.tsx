import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { LineType } from "@/generated/graphql";
import type { EditionStats } from "../types";
import { ForecastVsActualBlock } from "./forecast-vs-actual-block";

interface Props {
  edition: EditionStats | null | undefined;
  isLoading?: boolean;
}

export function ForecastVsActualCards({ edition, isLoading = false }: Props) {
  const showSkeleton = isLoading || !edition;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            <TypographyH3>Recettes</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>Réalisé par rapport au budget prévu.</TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSkeleton ? (
            <ForecastBlockSkeleton />
          ) : (
            <ForecastVsActualBlock
              real={edition.totalIncome}
              forecast={edition.totalPrevisionnalIncome}
              lineType={LineType.Income}
            />
          )}
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>
            <TypographyH3>Dépenses</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>Réalisé par rapport au budget prévu.</TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSkeleton ? (
            <ForecastBlockSkeleton />
          ) : (
            <ForecastVsActualBlock
              real={edition.totalExpense}
              forecast={edition.totalPrevisionnalExpense}
              lineType={LineType.Expense}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ForecastBlockSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <Skeleton className="h-5 w-full" />
    </div>
  );
}
