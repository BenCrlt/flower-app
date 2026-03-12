import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChartNoAxesCombined,
  Coins,
  CreditCard,
  Flower,
  LayoutDashboard,
  MoreVertical,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/budget-table", icon: ChartNoAxesCombined, label: "Budget" },
  { to: "/invoices", icon: CreditCard, label: "Factures" },
  { to: "/sales", icon: Coins, label: "Ventes" },
] as const;

export function AppSidebar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { data: session } = authClient.useSession();
  const username = session?.user?.username ?? "Utilisateur";
  const userInitial = username.charAt(0)?.toUpperCase() ?? "?";

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader className="flex flex-row items-center gap-3 px-3 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Flower className="h-5 w-5 text-primary" />
        </div>
        <span
          className="text-sm font-semibold tracking-wide uppercase group-data-[collapsible=icon]:hidden"
          style={{ fontFamily: '"Akira Expanded", serif' }}
        >
          FMF Admin
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.to || pathname.startsWith(`${item.to}/`);

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link to={item.to}>
                      <Icon className="mr-2 h-5 w-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <div className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
              {userInitial}
            </div>
            <span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
              {username}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden"
                aria-label="User menu"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem
                variant="destructive"
                onClick={() => authClient.signOut()}
              >
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
