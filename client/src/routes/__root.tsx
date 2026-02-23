import { EditionSelector } from "@/components/EditionSelector";
import { Sidebar } from "@/components/Sidebar";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="flex h-screen overflow-hidden py-4 pr-4 bg-card">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <EditionSelector />
        <Outlet />
      </main>
    </div>
  );
}
