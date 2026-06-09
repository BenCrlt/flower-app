import { CheckboxFilterSheet } from "@/components/CheckboxFilterSheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InvoiceStatus } from "@/generated/graphql";
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
              className="h-11 w-full sm:h-9 sm:max-w-xs"
            />
            {vendorOptions.length > 0 ? (
              <CheckboxFilterSheet
                label="Fournisseur"
                options={vendorOptions.map((vendor) => ({
                  id: vendor.id,
                  label: vendor.name,
                }))}
                selectedIds={vendorIdsFilter}
                onToggle={onSelectVendor}
                contentClassName="max-h-72"
              />
            ) : null}
            <CheckboxFilterSheet<InvoiceStatus>
              label="Statut"
              options={statusAvailable.map((status) => ({
                id: status,
                label: status,
              }))}
              selectedIds={statusFilter}
              onToggle={onSelectStatus}
              renderOption={(option) => (
                <InvoiceStatusBadge status={option.id} />
              )}
            />
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-center sm:justify-end [&_button]:h-11 [&_button]:w-full sm:[&_button]:h-9 sm:[&_button]:w-auto">
          <AddInvoiceSheet />
        </div>
      </CardContent>
    </Card>
  );
}
