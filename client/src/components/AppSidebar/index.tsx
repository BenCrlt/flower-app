import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChartNoAxesCombined,
  Coins,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import { AppSidebarFooter } from "./footer";
import { AppSidebarHeader } from "./header";
import { SidebarEditionSelector } from "./SidebarEditionSelector";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/budget-table", icon: ChartNoAxesCombined, label: "Budget" },
  { to: "/invoices", icon: CreditCard, label: "Factures" },
  { to: "/sales", icon: Coins, label: "Ventes" },
] as const;

export function AppSidebar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <Sidebar collapsible="icon" variant="floating">
      <AppSidebarHeader />
      <div className="p-2 border-b border-sidebar-border">
        <SidebarEditionSelector />
      </div>
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
      <AppSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
