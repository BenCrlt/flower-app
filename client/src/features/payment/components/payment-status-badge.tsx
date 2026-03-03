import { Badge } from "@/components/ui/badge";
import { InvoiceStatus } from "@/generated/graphql";
import { ReactElement } from "react";
import { getStatusColor, getStatusText } from "../utils";

interface Props {
  status: InvoiceStatus;
}

export function PaymentStatusBadge({ status }: Props): ReactElement {
  return <Badge variant={getStatusColor(status)}>{getStatusText(status)}</Badge>;
}
