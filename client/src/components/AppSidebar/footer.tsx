import { authClient } from "@/lib/auth-client";
import { ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

function SidebarUserButton() {
  const { data: session } = authClient.useSession();
  const username = session?.user?.username ?? "Utilisateur";
  const avatarUrl = session?.user?.image || undefined;
  const userInitial = username.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="h-full w-full object-cover"
          />
        ) : (
          userInitial
        )}
      </div>
      <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
        <span className="truncate text-sm font-medium">{username}</span>
      </div>
    </div>
  );
}

export function AppSidebarFooter(): ReactElement {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="flex justify-between"
                aria-label="Changer d’édition"
              >
                <SidebarUserButton />
                <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-60">
              <div className="flex items-center gap-3 px-2 py-1.5">
                <SidebarUserButton />{" "}
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => authClient.signOut()}
              >
                <LogOut className="h-4 w-4" />
                <span>Se déconnecter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
