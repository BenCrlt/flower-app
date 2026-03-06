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
  vendorId: number;
  status: InvoiceStatus;
  note: string;
  payments: PaymentLineValues[];
};

export const invoiceFormResolver: Resolver<InvoiceFormValues> = (values) => {
  const errors: Record<string, { type: string; message: string }> = {};

  if (!values.vendorId) {
    errors.vendorId = { type: "required", message: "Ce champ est requis." };
  }

  if (!values.status) {
    errors.status = { type: "required", message: "Ce champ est requis." };
  }

  if (!values.payments || values.payments.length === 0) {
    errors.payments = {
      type: "required",
      message: "Au moins une ligne est requise.",
    };
  } else {
    for (const p of values.payments) {
      if (!p.budgetLineId) {
        errors.payments = {
          type: "required",
          message: "Chaque ligne doit avoir une ligne budgétaire.",
        };
        break;
      }
      if (isNaN(p.quantity) || p.quantity <= 0) {
        errors.payments = {
          type: "pattern",
          message: "La quantité doit être supérieure à 0.",
        };
        break;
      }
      if (isNaN(p.unitPrice) || p.unitPrice < 0) {
        errors.payments = {
          type: "pattern",
          message: "Le prix unitaire doit être positif.",
        };
        break;
      }
    }
  }

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};
