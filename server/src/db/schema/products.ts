import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { budgetLines } from "./budget-lines.js";
import { events } from "./events.js";
import { sales } from "./sales.js";

export const products = drizzleSilk(
  pgTable("products", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    unitPrice: smallint().notNull().default(0),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLines.id),
    eventId: integer()
      .notNull()
      .references(() => events.id),
  }),
);

export const productsRelations = relations(products, ({ one, many }) => ({
  budgetLine: one(budgetLines, {
    fields: [products.budgetLineId],
    references: [budgetLines.id],
  }),
  event: one(events, {
    fields: [products.eventId],
    references: [events.id],
  }),
  sales: many(sales),
}));
