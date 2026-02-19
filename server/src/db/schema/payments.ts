import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { eventsTable } from "./events";
import { receiptsTable } from "./receipts";
import { usersTable } from "./users";

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
