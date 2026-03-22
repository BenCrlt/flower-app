import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typography";
import { ChangePinDialog } from "./change-pin-dialog";
import { UpdateUsernameField } from "./update-username-field";

export function SettingsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Paramètres</TypographyH2>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>
            <TypographyH3>Vos informations</TypographyH3>
          </CardTitle>
          <CardDescription>
            <TypographyP>Modifiez vos informations personnelles.</TypographyP>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <UpdateUsernameField />
          <div className="flex flex-col gap-2 w-fit">
            <Label>Code PIN</Label>
            <ChangePinDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
