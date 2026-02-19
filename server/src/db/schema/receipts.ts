import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { eventsTable } from "./events";
import { usersTable } from "./users";
import { vendorsTable } from "./vendors";

export const receiptsTable = pgTable("receipts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
  vendorId: integer()
    .notNull()
    .references(() => vendorsTable.id),
  totalAmount: smallint().notNull().default(0),
  note: text(),
  executedAt: date().notNull().defaultNow(),
  authorId: integer()
    .notNull()
    .references(() => usersTable.id),
});
