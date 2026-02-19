import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { budgetLines } from "./budget-lines.js";
import { payments } from "./payments.js";
import { products } from "./products.js";
import { receipts } from "./receipts.js";
import { sales } from "./sales.js";

export const events = drizzleSilk(
  pgTable("events", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    startDate: date().notNull(),
  }),
);

export const eventsRelations = relations(events, ({ many }) => ({
  budgetLines: many(budgetLines),
  products: many(products),
  sales: many(sales),
  payments: many(payments),
  receipts: many(receipts),
}));
