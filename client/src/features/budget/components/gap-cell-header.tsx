import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Column } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { BudgetTableRow } from "./columns";

interface Props {
  column: Column<BudgetTableRow, unknown>;
  onToggleGapInPercent: () => void;
  showGapInPercent: boolean;
}

export function GapCellHeader({
  column,
  onToggleGapInPercent,
  showGapInPercent,
}: Props) {
  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            Écart
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={onToggleGapInPercent}>
            Afficher en valeur {showGapInPercent ? "relative" : "absolue"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Trier par ordre croissant
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "desc")
            }
          >
            Trier par ordre décroissant
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
