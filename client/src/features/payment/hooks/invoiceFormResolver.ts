import { InvoiceStatus } from "@/generated/graphql";
import { Resolver } from "react-hook-form";

export type PaymentLineValues = {
  id?: number;
  budgetLineId: number;
  quantity: number;
  unitPrice: number;
};

export type InvoiceFormValues = {
  id?: number;
  name: string;
  vendorId: number;
  status: InvoiceStatus;
  note: string;
  payments: PaymentLineValues[];
  withoutTVA?: boolean;
};

export const invoiceFormResolver: Resolver<InvoiceFormValues> = (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.name) {
    errors.name = { type: "required", message: "Ce champ est requis." };
  }

  if (!values.vendorId) {
    errors.vendorId = { type: "required", message: "Ce champ est requis." };
  }

  if (!values.status) {
    errors.status = { type: "required", message: "Ce champ est requis." };
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
