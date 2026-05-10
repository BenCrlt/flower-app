import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { budgetLinesTable } from "./budget-lines.js";
import { orderOriginsTable } from "./order-origins.js";

export const orderOriginBudgetLinesTable = drizzleSilk(
  pgTable("order-origin-budget-lines", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderOriginId: integer()
      .notNull()
      .references(() => orderOriginsTable.id, { onDelete: "cascade" }),
    budgetLineId: integer()
      .notNull()
      .references(() => budgetLinesTable.id, { onDelete: "cascade" }),
  }),
);

export type OrderOriginBudgetLine = InferSelectModel<
  typeof orderOriginBudgetLinesTable
>;
