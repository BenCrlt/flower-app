import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const editionsTable = drizzleSilk(
  pgTable("editions", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    startDate: date().notNull(),
  }),
);

export type Edition = InferSelectModel<typeof editionsTable>;
