import { integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines";
import { eventsTable } from "./events";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  unitPrice: smallint().notNull().default(0),
  budgetLineId: integer()
    .notNull()
    .references(() => budgetLinesTable.id),
  eventId: integer()
    .notNull()
    .references(() => eventsTable.id),
});
