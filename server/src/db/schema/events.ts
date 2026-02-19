import { relations } from "drizzle-orm";
import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";
import { paymentsTable } from "./payments.js";
import { productsTable } from "./products.js";
import { receiptsTable } from "./receipts.js";
import { salesTable } from "./sales.js";

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  startDate: date().notNull(),
});

export const eventsRelations = relations(eventsTable, ({ many }) => ({
  budgetLines: many(budgetLinesTable),
  products: many(productsTable),
  sales: many(salesTable),
  payments: many(paymentsTable),
  receipts: many(receiptsTable),
}));
