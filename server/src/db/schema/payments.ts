import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { budgetLines } from "./budget-lines.js";
import { events } from "./events.js";
import { receipts } from "./receipts.js";
import { users } from "./users.js";

export const payments = drizzleSilk(
  pgTable("payments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    amount: smallint().notNull().default(0),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    eventId: integer()
      .notNull()
      .references(() => events.id),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLines.id),
    receiptId: integer().references(() => receipts.id),
    authorId: integer()
      .notNull()
      .references(() => users.id),
  }),
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  event: one(events, {
    fields: [payments.eventId],
    references: [events.id],
  }),
  budgetLine: one(budgetLines, {
    fields: [payments.budgetLineId],
    references: [budgetLines.id],
  }),
  receipt: one(receipts, {
    fields: [payments.receiptId],
    references: [receipts.id],
  }),
  author: one(users, {
    fields: [payments.authorId],
    references: [users.id],
  }),
}));
