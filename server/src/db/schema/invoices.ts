import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { editionsTable } from "./editions";
import { usersTable } from "./users";
import { vendorsTable } from "./vendors";

export const invoiceStatus = pgEnum("invoiceStatus", [
  "pending",
  "paid",
  "cancelled",
]);
export type InvoiceStatus = (typeof invoiceStatus.enumValues)[number];

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
    status: invoiceStatus().notNull(),
  }),
);
