import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Flower, LogOut, Settings, X } from "lucide-react";
import { ReactElement } from "react";
import { SidebarEditionSelector } from "./sidebar-editions-selector";

export interface AppSidebarMobileNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface AppSidebarMobileProps {
  navItems: AppSidebarMobileNavItem[];
  pathname: string;
}

export function AppSidebarMobile({
  navItems,
  pathname,
}: AppSidebarMobileProps): ReactElement {
  const { setOpenMobile } = useSidebar();
  const { data: session } = authClient.useSession();
  const username = session?.user?.username ?? "Utilisateur";
  const avatarUrl = session?.user?.image || undefined;
  const userInitial = username.charAt(0)?.toUpperCase() ?? "?";

  return (
    <div className="flex h-full min-h-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-sidebar-border px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex min-w-0 items-center gap-3">
          <Flower className="h-8 w-8 shrink-0 text-primary" />
          <span
            className="truncate font-semibold uppercase tracking-wide"
            style={{ fontFamily: '"Akira Expanded", serif' }}
          >
            FMF Admin
          </span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-11 shrink-0 rounded-full"
          onClick={() => setOpenMobile(false)}
          aria-label="Fermer le menu"
        >
          <X className="size-6" />
        </Button>
      </div>

      <div className="shrink-0 border-b border-sidebar-border px-3 py-3">
        <SidebarEditionSelector
          dropdownContentSide="bottom"
          className="w-full"
          triggerClassName="min-h-14 w-full rounded-xl px-3 py-3 text-base"
        />
      </div>

      <nav
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4"
        aria-label="Navigation principale"
      >
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/55">
          Menu
        </p>
        {navItems.length === 0 ? (
          <p className="rounded-xl border border-dashed border-sidebar-border px-4 py-6 text-center text-sm text-sidebar-foreground/70">
            Sélectionnez une édition pour accéder aux sections.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.to || pathname.startsWith(`${item.to}/`);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/60",
                    )}
                  >
                    <Icon className="size-6 shrink-0 opacity-90" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>

      <div className="shrink-0 space-y-3 border-t border-sidebar-border bg-sidebar/95 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-3 rounded-xl px-2 py-1">
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/15 text-base font-semibold text-primary">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                className="size-full object-cover"
              />
            ) : (
              userInitial
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{username}</p>
            <p className="truncate text-xs text-sidebar-foreground/65">
              Compte
            </p>
          </div>
        </div>

        <Separator className="bg-sidebar-border" />

        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            className="h-12 w-full justify-start gap-3 rounded-xl px-3 text-base font-normal"
            asChild
          >
            <Link to="/settings" onClick={() => setOpenMobile(false)}>
              <Settings className="size-5 shrink-0" />
              Paramètres
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="h-12 w-full justify-start gap-3 rounded-xl px-3 text-base font-normal text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => {
              setOpenMobile(false);
              void authClient.signOut();
            }}
          >
            <LogOut className="size-5 shrink-0" />
            Se déconnecter
          </Button>
        </div>
      </div>
    </div>
  );
}
