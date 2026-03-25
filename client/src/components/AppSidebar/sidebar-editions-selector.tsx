import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useEdition } from "@/features/edition/EditionContext";
import { CalendarDays, ChevronsUpDown } from "lucide-react";
import { SidebarEditionItem } from "./sidebar-edition-item";

export function SidebarEditionSelector() {
  const { edition, setEdition, editions } = useEdition();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex justify-between"
              aria-label="Changer d’édition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary">
                  <CalendarDays className="h-4 w-4" />
                </div>
                <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                  {edition ? (
                    <SidebarEditionItem edition={edition} />
                  ) : (
                    <span className="truncate text-sm font-medium">-</span>
                  )}
                </div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="right"
            align="start"
            sideOffset={8}
            className="min-w-48"
          >
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Editions
            </DropdownMenuLabel>
            {editions.map((e) => (
              <DropdownMenuItem
                key={e.id}
                onClick={() => setEdition(e)}
                className="flex items-center justify-between gap-2"
              >
                <SidebarEditionItem edition={e} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
