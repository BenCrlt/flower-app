import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { paymentsTable } from "./payments.js";
import { receiptsTable } from "./receipts.js";
import { salesTable } from "./sales.js";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  sales: many(salesTable),
  payments: many(paymentsTable),
  receipts: many(receiptsTable),
}));
