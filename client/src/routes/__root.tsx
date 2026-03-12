import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEditionContext } from "@/features/edition/EditionContext";
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

const PROTECTED_ROUTES = ["/dashboard", "/budget-table"];

function EditionGuard({ children }: { children: React.ReactNode }) {
  const { editions } = useEditionContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isProtected = PROTECTED_ROUTES.some((r) =>
    location.pathname.startsWith(r),
  );

  useEffect(() => {
    if (editions.length === 0 && isProtected) {
      navigate({ to: "/editions" });
    }
  }, [editions.length, isProtected, navigate]);

  if (editions.length === 0 && isProtected) return null;

  return <>{children}</>;
}

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
        <AppSidebar />
        <main className="px-6 py-10 w-full">
          <EditionGuard>
            <Outlet />
          </EditionGuard>
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
}
