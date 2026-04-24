import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { AddUserDialog } from "./add-user-dialog";

export const DangerZoneCard = () => {
  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <TypographyH3>Danger zone</TypographyH3>
        </CardTitle>
        <CardDescription>
          <TypographyP>
            Dans cette section, vous retrouverez toutes les actions admins
          </TypographyP>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-fit">
          <AddUserDialog />
        </div>
      </CardContent>
    </Card>
  );
};
