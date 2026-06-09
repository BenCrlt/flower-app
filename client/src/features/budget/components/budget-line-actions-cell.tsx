import { BudgetCategoriesItem } from "@/generated/graphql";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { BudgetLineActionsMenu } from "./budget-line-actions-menu";
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
        <BudgetLineActionsMenu
          row={row.original}
          onDelete={onDelete}
          onEdit={() => setEditOpen(true)}
        />
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
