import { drizzleSilk } from "@gqloom/drizzle";
import { asEnumType } from "@gqloom/zod/v3";
import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import z from "zod";
import { user } from "./auth.js";
import { editionsTable } from "./editions.js";
import { vendorsTable } from "./vendors.js";

const INVOICE_STATUS_VALUES = ["PENDING", "PAID", "CANCELLED"] as const;
export const invoiceStatusSchema = z
  .enum(INVOICE_STATUS_VALUES)
  .superRefine(asEnumType({ name: "InvoiceStatus" }));

export type Invoice = InferSelectModel<typeof invoicesTable>;

export const invoicesTable = drizzleSilk(
  pgTable("invoices", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    name: varchar({ length: 255 }).notNull(),
    vendorId: integer()
      .notNull()
      .references(() => vendorsTable.id),
    totalAmount: numeric("totalAmount", {
      precision: 10,
      scale: 2,
    })
      .default("0.00")
      .notNull(),
    note: text(),
    authorId: text()
      .notNull()
      .references(() => user.id),
    executedAt: timestamp(),
    status: text({ enum: INVOICE_STATUS_VALUES }).notNull(),
  }),
);
