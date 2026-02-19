import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { eventsTable } from "./events.js";
import { paymentsTable } from "./payments.js";
import { usersTable } from "./users.js";
import { vendorsTable } from "./vendors.js";

export const receiptsTable = drizzleSilk(
  pgTable("receipts", {
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
  }),
);

export const receiptsRelations = relations(receiptsTable, ({ one, many }) => ({
  event: one(eventsTable, {
    fields: [receiptsTable.eventId],
    references: [eventsTable.id],
  }),
  vendor: one(vendorsTable, {
    fields: [receiptsTable.vendorId],
    references: [vendorsTable.id],
  }),
  author: one(usersTable, {
    fields: [receiptsTable.authorId],
    references: [usersTable.id],
  }),
  payments: many(paymentsTable),
}));
