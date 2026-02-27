import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { formatPriceToEuros } from "@/utils/PriceUtils";
import { TrendingUp } from "lucide-react";

export function CurrentBalanceCard() {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Solde actuel</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>Consultez votre solde actuel ici.</TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TypographyH1>{formatPriceToEuros(2000)}</TypographyH1>
        <TypographyH3 className="text-green-500 flex gap-2 items-center">
          + 35% <TrendingUp />
        </TypographyH3>
      </CardContent>
    </Card>
  );
}
