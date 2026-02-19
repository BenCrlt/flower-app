import { drizzleSilk } from "@gqloom/drizzle";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const vendorsTable = drizzleSilk(
  pgTable("vendors", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }),
    phoneNumber: varchar({ length: 255 }),
    address: varchar({ length: 255 }),
    description: text(),
  }),
);
