import { EditionSelector } from "@/components/EditionSelector";
import { Sidebar } from "@/components/Sidebar";
import { useEditionContext } from "@/features/edition/EditionContext";
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

function RootLayout() {
  return (
    <div className="flex h-screen overflow-hidden py-4 pr-4 bg-card">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <EditionSelector />
        <EditionGuard>
          <Outlet />
        </EditionGuard>
      </main>
    </div>
  );
}
