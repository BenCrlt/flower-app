import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { EditionProvider } from "@/features/edition/EditionContext";
import { authClient } from "@/lib/auth-client";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { Flower } from "lucide-react";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthRoute = location.pathname.startsWith("/auth/");

  useEffect(() => {
    if (isPending) return;
    if (!session && !isAuthRoute) {
      navigate({ to: "/auth/sign-in" });
    }
    if (session && isAuthRoute) {
      navigate({ to: "/" });
    }
  }, [session, isPending, isAuthRoute, navigate]);

  if (isPending) return null;

  return <>{children}</>;
}

function RootLayout() {
  const location = useLocation();
  const isAuthRoute = location.pathname.startsWith("/auth/");

  if (isAuthRoute) {
    return (
      <AuthGuard>
        <Outlet />
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <SidebarProvider>
        <EditionProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
              <SidebarTrigger className="size-9" />
              <Flower className="h-7 w-7 shrink-0 text-primary" />
              <span
                className="truncate font-semibold tracking-wide uppercase"
                style={{ fontFamily: '"Akira Expanded", serif' }}
              >
                FMF Admin
              </span>
            </header>
            <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col px-4 py-6 md:px-6 md:py-10">
              <Outlet />
            </div>
          </SidebarInset>
        </EditionProvider>
      </SidebarProvider>
    </AuthGuard>
  );
}
