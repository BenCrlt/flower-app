import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { BudgetCategoriesItem } from "@/generated/graphql";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { BudgetTableRow } from "./columns";
import { EditBudgetLineSheet } from "./edit-budget-line-sheet";

interface Props {
  onDelete: (id: number) => void;
  row: Row<BudgetTableRow>;
  allCategories?: BudgetCategoriesItem[];
}

export function BudgetLineActionsCell({ onDelete, row, allCategories }: Props) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Separator />
            <DropdownMenuItem onSelect={() => setEditOpen(true)}>
              <Pencil /> Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(row.original.id)}
            >
              <Trash /> Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <EditBudgetLineSheet
        open={editOpen}
        onOpenChange={setEditOpen}
        line={row.original}
        allCategories={allCategories}
      />
    </>
  );
}
