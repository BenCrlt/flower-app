import { relations } from "drizzle-orm";
import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";
import { eventsTable } from "./events.js";
import { salesTable } from "./sales.js";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  unitPrice: smallint().notNull().default(0),
  budgetLineId: integer()
    .notNull()
    .references(() => budgetLinesTable.id),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  budgetLine: one(budgetLinesTable, {
    fields: [productsTable.budgetLineId],
    references: [budgetLinesTable.id],
  }),
  event: one(eventsTable, {
    fields: [productsTable.eventId],
    references: [eventsTable.id],
  }),
  sales: many(salesTable),
}));
