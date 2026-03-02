import { drizzleSilk } from "@gqloom/drizzle";
import {
  date,
  integer,
  numeric,
  pgTable,
  smallint,
  text,
} from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";
import { invoicesTable } from "./invoices";
import { usersTable } from "./users";

export const paymentsTable = drizzleSilk(
  pgTable("payments", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: smallint().default(1).notNull(),
    unitPrice: numeric("unitPrice", {
      precision: 10,
      scale: 2,
    })
      .default("0.00")
      .notNull(),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    invoiceId: integer().references(() => invoicesTable.id),
    authorId: integer()
      .notNull()
      .references(() => usersTable.id),
  }),
);
