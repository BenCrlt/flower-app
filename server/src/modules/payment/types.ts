import { asEnumType } from "@gqloom/zod/v3";
import z from "zod";
import { invoiceStatus } from "../../db/schema";

export const InvoiceStatusEnum = z
  .enum(invoiceStatus.enumValues)
  .superRefine(asEnumType({ name: "InvoiceStatusEnum" }));
