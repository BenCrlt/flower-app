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
import { authClient } from "@/lib/auth-client";
import { AddUserDialog } from "./add-user-dialog";
import { ChangePinDialog } from "./change-pin-dialog";
import { UpdateUsernameField } from "./update-username-field";

export function SettingsPanel() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

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
      {isAdmin && (
        <Card className="flex flex-col gap-4">
          <CardHeader>
            <CardTitle>
              <TypographyH3>Actions administrateurs</TypographyH3>
            </CardTitle>
            <CardDescription>
              <TypographyP>
                Dans cette section, vous pouvez ajouter des nouveaux
                utilisateurs et gérer les permissions.
              </TypographyP>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 w-fit">
              <AddUserDialog />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
