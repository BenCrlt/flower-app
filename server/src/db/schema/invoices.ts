import { drizzleSilk } from "@gqloom/drizzle";
import { asEnumType } from "@gqloom/zod/v3";
import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import z from "zod";
import { editionsTable } from "./editions";
import { usersTable } from "./users";
import { vendorsTable } from "./vendors";

const INVOICE_STATUS_VALUES = ["pending", "paid", "cancelled"] as const;
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
    authorId: integer()
      .notNull()
      .references(() => usersTable.id),
    executedAt: timestamp(),
    status: text({ enum: INVOICE_STATUS_VALUES }).notNull(),
  }),
);
