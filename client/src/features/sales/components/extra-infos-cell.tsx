import { SalesTableRow } from "./columns";

export interface ExtraInfosCellProps {
  row: SalesTableRow;
}

export function ExtraInfosCell({ row }: ExtraInfosCellProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-medium">
        {row.payerFirstName && row.payerLastName
          ? `${row.payerFirstName} ${row.payerLastName}`
          : "-"}
      </span>
      <span className="text-sm text-gray-500">{row.payerEmail}</span>
    </div>
  );
}
