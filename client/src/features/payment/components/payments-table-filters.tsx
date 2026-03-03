import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InvoiceStatus } from "@/generated/graphql";
import { Table } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";
import { ReactElement, useState } from "react";
import { PaymentTableRow } from "./columns";
import { PaymentStatusBadge } from "./payment-status-badge";

interface Props {
  table: Table<PaymentTableRow>;
}

export function PaymentsTableFilter({ table }: Props): ReactElement {
  const [statusFiltered, setStatusFiltered] = useState<InvoiceStatus[]>([]);

  const statusAvailable = [
    InvoiceStatus.Paid,
    InvoiceStatus.Pending,
    InvoiceStatus.Cancelled,
  ];

  const handleSelectStatus = (status: InvoiceStatus, checked: boolean) => {
    if (!checked) {
      setStatusFiltered((prev) => prev.filter((s) => s !== status));
      return;
    }
    setStatusFiltered((prev) => [...prev, status]);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Rechercher..."
        value={""}
        onChange={(event) => {
          const value = event.target.value;
          table.setGlobalFilter(value);
        }}
        className="w-80"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={statusFiltered.length ? "default" : "outline"}
            className={"border-dashed"}
          >
            <ListFilter />
            Status {statusFiltered.length ? `(${statusFiltered.length})` : ""}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuGroup>
            {statusAvailable.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                className="capitalize"
                checked={statusFiltered.includes(status)}
                onSelect={(e) => e.preventDefault()}
                onCheckedChange={(value) => handleSelectStatus(status, value)}
              >
                <PaymentStatusBadge status={status} />
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
