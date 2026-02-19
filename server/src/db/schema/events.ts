import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  startDate: date().notNull(),
});
