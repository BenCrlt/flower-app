import { drizzleSilk } from "@gqloom/drizzle";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";
import { receiptsTable } from "./receipts";
import { usersTable } from "./users";

export const paymentsTable = drizzleSilk(
  pgTable("payments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    amount: smallint().notNull().default(0),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    receiptId: integer().references(() => receiptsTable.id),
    authorId: integer()
      .notNull()
      .references(() => usersTable.id),
  }),
);
