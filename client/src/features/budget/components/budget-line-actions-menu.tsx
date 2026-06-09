import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { BudgetTableRow } from "./columns";

interface Props {
  row: BudgetTableRow;
  onDelete: (id: number) => void;
  onEdit: (row: BudgetTableRow) => void;
}

export function BudgetLineActionsMenu({ onDelete, onEdit, row }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-9 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem onSelect={() => onEdit(row)}>
          <Pencil /> Modifier
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => onDelete(row.id)}
        >
          <Trash /> Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
