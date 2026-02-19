import { drizzleSilk } from "@gqloom/drizzle";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
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
    totalAmount: smallint().notNull().default(0),
    note: text(),
    executedAt: date().notNull().defaultNow(),
    authorId: integer()
      .notNull()
      .references(() => usersTable.id),
  }),
);
