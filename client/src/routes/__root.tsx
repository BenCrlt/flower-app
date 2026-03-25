import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { EditionProvider } from "@/features/edition/EditionContext";
import { authClient } from "@/lib/auth-client";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
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
          <main className="px-6 py-10 w-full">
            <Outlet />
          </main>
        </EditionProvider>
      </SidebarProvider>
    </AuthGuard>
  );
}
