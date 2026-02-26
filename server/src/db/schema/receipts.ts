import { drizzleSilk } from "@gqloom/drizzle";
import { date, integer, numeric, pgTable, text } from "drizzle-orm/pg-core";
import { editionsTable } from "./editions";
import { usersTable } from "./users";
import { vendorsTable } from "./vendors";

export const receiptsTable = drizzleSilk(
  pgTable("receipts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    vendorId: integer()
      .notNull()
      .references(() => vendorsTable.id),
    totalAmount: numeric("totalAmount", {
      precision: 10,
      scale: 2,
    })
      .default("0.00")
      .notNull(),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    authorId: integer()
      .notNull()
      .references(() => usersTable.id),
  }),
);
