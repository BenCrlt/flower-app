import { drizzleSilk } from "@gqloom/drizzle";
import { integer, numeric, pgTable, smallint } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";
import { invoicesTable } from "./invoices";

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
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id, {
        onDelete: "cascade",
      }),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id),
    invoiceId: integer().references(() => invoicesTable.id, {
      onDelete: "cascade",
    }),
  }),
);
