import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  timestamp,
} from "drizzle-orm/pg-core";
import { eventsTable } from "./events";
import { productsTable } from "./products";
import { usersTable } from "./users";

export const paymentMethod = pgEnum("payment_method", ["cash", "card"]);
export type PaymentMethod = (typeof paymentMethod.enumValues)[number];

export const salesTable = pgTable("sales", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  quantity: smallint().notNull().default(0),
  executedAt: timestamp().notNull().defaultNow(),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
  authorId: integer()
    .notNull()
    .references(() => usersTable.id),
});
