import { Flower } from "lucide-react";
import { SidebarHeader } from "../ui/sidebar";

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="flex flex-row items-center gap-3 px-3 py-4">
      <Flower className="h-8 w-8 text-primary" />
      <span
        className="font-semibold tracking-wide uppercase group-data-[collapsible=icon]:hidden"
        style={{ fontFamily: '"Akira Expanded", serif' }}
      >
        FMF Admin
      </span>
    </SidebarHeader>
  );
}
