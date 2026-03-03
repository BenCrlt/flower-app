import { badgeVariants } from "@/components/ui/badge";
import { InvoiceStatus } from "@/generated/graphql";
import { VariantProps } from "class-variance-authority";

export const getStatusText = (status: InvoiceStatus): string => {
  switch (status) {
    case InvoiceStatus.Paid:
      return "Payé";
    case InvoiceStatus.Cancelled:
      return "Annulé";
    case InvoiceStatus.Pending:
      return "En attente";
  }
};

export const getStatusColor = (
  status: InvoiceStatus,
): VariantProps<typeof badgeVariants>["variant"] => {
  switch (status) {
    case InvoiceStatus.Paid:
      return "success";
    case InvoiceStatus.Cancelled:
      return "destructive";
    case InvoiceStatus.Pending:
      return "warning";
  }
};
