import { Row } from "@tanstack/react-table";
import { InvoiceTableRow } from "./columns";
import { InvoiceActionsMenu } from "./invoice-actions-menu";

interface Props {
  onDelete: (id: number) => void;
  onEdit: (row: InvoiceTableRow) => void;
  row: Row<InvoiceTableRow>;
}

export function InvoicesTableActionsLine({ onDelete, onEdit, row }: Props) {
  return (
    <div onClick={(event) => event.stopPropagation()}>
      <InvoiceActionsMenu
        row={row.original}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
}
