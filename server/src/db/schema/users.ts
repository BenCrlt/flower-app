import { drizzleSilk } from "@gqloom/drizzle";
import { relations } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { payments } from "./payments.js";
import { receipts } from "./receipts.js";
import { sales } from "./sales.js";

export const users = drizzleSilk(
  pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  sales: many(sales),
  payments: many(payments),
  receipts: many(receipts),
}));
