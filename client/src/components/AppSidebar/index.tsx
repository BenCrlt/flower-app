import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEdition } from "@/features/edition/EditionContext";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  ChartNoAxesCombined,
  Coins,
  CreditCard,
  LayoutDashboard,
} from "lucide-react";
import { AppSidebarMobile } from "./app-sidebar-mobile";
import { AppSidebarFooter } from "./footer";
import { AppSidebarHeader } from "./header";
import { SidebarEditionSelector } from "./sidebar-editions-selector";

export function AppSidebar() {
  const { edition } = useEdition();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  const navItems = edition
    ? [
        { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/budget-table", icon: ChartNoAxesCombined, label: "Budget" },
        { to: "/invoices", icon: CreditCard, label: "Factures" },
        { to: "/sales", icon: Coins, label: "Ventes" },
      ]
    : [];

  return (
    <Sidebar collapsible="icon" variant="floating">
      {isMobile ? (
        <AppSidebarMobile navItems={navItems} pathname={pathname} />
      ) : (
        <>
          <AppSidebarHeader />
          <div className="border-b border-sidebar-border p-2">
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
        </>
      )}
    </Sidebar>
  );
}
