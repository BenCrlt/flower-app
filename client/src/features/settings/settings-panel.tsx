import { TypographyH2 } from "@/components/ui/typography";
import { authClient } from "@/lib/auth-client";
import { DangerZoneCard } from "./components/danger-zone/card";
import { EditionCard } from "./components/edition/card";
import { GoogleDriveCard } from "./components/google-drive/card";
import { HelloAssoCard } from "./components/hello-asso/card";
import { OrderOriginsCard } from "./components/order-origins/card";
import { PersonnalInfosCard } from "./components/personnal-infos/card";
import { CategoriesCard } from "./components/categories-card/card";

export function SettingsPanel() {
  const { data: session } = authClient.useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Paramètres</TypographyH2>
      <PersonnalInfosCard />
      <OrderOriginsCard />
      <CategoriesCard />
      <HelloAssoCard />
      <GoogleDriveCard />
      <EditionCard />
      {isAdmin && <DangerZoneCard />}
    </div>
  );
}
