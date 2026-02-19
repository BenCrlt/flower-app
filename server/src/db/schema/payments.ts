import { relations } from "drizzle-orm";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";
import { eventsTable } from "./events.js";
import { receiptsTable } from "./receipts.js";
import { usersTable } from "./users.js";

export const paymentsTable = pgTable("payments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  amount: smallint().notNull().default(0),
  note: text(),
  executedAt: date().notNull().defaultNow(),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
  budgetLineId: integer()
    .notNull()
    .references(() => budgetLinesTable.id),
  receiptId: integer().references(() => receiptsTable.id),
  authorId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  event: one(eventsTable, {
    fields: [paymentsTable.eventId],
    references: [eventsTable.id],
  }),
  budgetLine: one(budgetLinesTable, {
    fields: [paymentsTable.budgetLineId],
    references: [budgetLinesTable.id],
  }),
  receipt: one(receiptsTable, {
    fields: [paymentsTable.receiptId],
    references: [receiptsTable.id],
  }),
  author: one(usersTable, {
    fields: [paymentsTable.authorId],
    references: [usersTable.id],
  }),
}));
