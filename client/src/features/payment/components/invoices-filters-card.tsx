import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InvoiceStatus } from "@/generated/graphql";
import { ListFilter } from "lucide-react";
import { AddInvoiceSheet } from "./add-invoice-sheet";
import { InvoiceStatusBadge } from "./invoice-status-badge";

interface VendorOption {
  id: number;
  name: string;
}

interface Props {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  vendorIdsFilter: number[];
  onSelectVendor: (vendorId: number, checked: boolean) => void;
  vendorOptions: VendorOption[];
  statusFilter: InvoiceStatus[];
  onSelectStatus: (status: InvoiceStatus, checked: boolean) => void;
}

const statusAvailable = [
  InvoiceStatus.Paid,
  InvoiceStatus.Pending,
  InvoiceStatus.Cancelled,
];

export function InvoicesFiltersCard({
  searchQuery,
  onSearchQueryChange,
  vendorIdsFilter,
  onSelectVendor,
  vendorOptions,
  statusFilter,
  onSelectStatus,
}: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle>Filtres</CardTitle>
            <CardDescription>
              Filtrez les factures par recherche, fournisseur et statut.
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              className="w-full sm:max-w-xs"
            />
            {vendorOptions.length > 0 ? (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={vendorIdsFilter.length ? "default" : "outline"}
                  className="w-full border-dashed sm:w-auto sm:max-w-fit"
                >
                  <ListFilter />
                  Fournisseur{" "}
                  {vendorIdsFilter.length
                    ? `(${vendorIdsFilter.length})`
                    : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-72 w-56 overflow-y-auto"
              >
                <DropdownMenuGroup>
                  {vendorOptions.map((vendor) => (
                    <DropdownMenuCheckboxItem
                      key={vendor.id}
                      checked={vendorIdsFilter.includes(vendor.id)}
                      onSelect={(event) => event.preventDefault()}
                      onCheckedChange={(checked) =>
                        onSelectVendor(vendor.id, checked)
                      }
                    >
                      <span className="truncate">{vendor.name}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={statusFilter.length ? "default" : "outline"}
                className="w-full border-dashed sm:w-auto sm:max-w-fit"
              >
                <ListFilter />
                Statut{" "}
                {statusFilter.length ? `(${statusFilter.length})` : ""}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuGroup>
                {statusAvailable.map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    className="capitalize"
                    checked={statusFilter.includes(status)}
                    onSelect={(event) => event.preventDefault()}
                    onCheckedChange={(checked) =>
                      onSelectStatus(status, checked)
                    }
                  >
                    <InvoiceStatusBadge status={status} />
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center sm:justify-end [&_button]:w-full sm:[&_button]:w-auto">
          <AddInvoiceSheet />
        </div>
      </CardContent>
    </Card>
  );
}
