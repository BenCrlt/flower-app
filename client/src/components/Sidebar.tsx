import { ChartNoAxesCombined, LayoutDashboard } from "lucide-react";
import FlowerLogo from "../assets/flower.svg?react";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <aside className="flex h-screen w-20 flex-col px-2 py-5 bg-card">
      <div className="flex flex-col gap-6 items-center justify-center">
        <FlowerLogo className="h-10 w-10 text-primary/60" />
        <nav className="flex flex-col gap-3">
          <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} />
          <SidebarItem
            to="/budget-table"
            icon={<ChartNoAxesCombined size={20} />}
          />
        </nav>
      </div>
    </aside>
  );
}
