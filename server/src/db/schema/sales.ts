import { drizzleSilk } from "@gqloom/drizzle";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { editionsTable } from "./editions";
import { productsTable } from "./products";

export const paymentMethod = pgEnum("payment_method", ["cash", "card"]);
export type PaymentMethod = (typeof paymentMethod.enumValues)[number];

export const salesTable = drizzleSilk(
  pgTable("sales", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    quantity: smallint().notNull().default(0),
    executedAt: timestamp().notNull().defaultNow(),
    productId: integer()
      .notNull()
      .references(() => productsTable.id),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    authorId: text()
      .notNull()
      .references(() => user.id),
  }),
);
