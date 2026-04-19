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
import { AddInvoiceSheet } from "./add-invoice-sheet";
import { InvoiceTableRow } from "./columns";
import { InvoiceStatusBadge } from "./invoice-status-badge";

interface Props {
  table: Table<InvoiceTableRow>;
}

export function InvoicesTableFiltersAndActions({ table }: Props): ReactElement {
  const [statusFiltered, setStatusFiltered] = useState<InvoiceStatus[]>([]);
  const value = table.getColumn("vendorName")?.getFilterValue() as string;

  const statusAvailable = [
    InvoiceStatus.Paid,
    InvoiceStatus.Pending,
    InvoiceStatus.Cancelled,
  ];

  const handleSelectStatus = (status: InvoiceStatus, checked: boolean) => {
    const newStatusFiltered = !checked
      ? statusFiltered.filter((s) => s !== status)
      : [...statusFiltered, status];

    setStatusFiltered(newStatusFiltered);
    table.getColumn("status")?.setFilterValue(newStatusFiltered);
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Rechercher..."
          value={value}
          onChange={(event) => {
            const value = event.target.value;
            table.setGlobalFilter(value);
          }}
          className="w-full md:w-80"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={statusFiltered.length ? "default" : "outline"}
              className={"w-full border-dashed md:w-auto"}
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
                  <InvoiceStatusBadge status={status} />
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex w-full flex-col md:w-auto [&_button]:w-full md:[&_button]:w-auto">
        <AddInvoiceSheet />
      </div>
    </div>
  );
}
