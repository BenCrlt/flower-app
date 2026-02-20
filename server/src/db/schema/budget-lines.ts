import { drizzleSilk } from "@gqloom/drizzle";
import { InferSelectModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  smallint,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import { budgetCategoriesTable } from "./budget-categories";
import { editionsTable } from "./editions";

export const lineTypeEnum = pgEnum("lineType", ["income", "expense"]);
export type LineType = (typeof lineTypeEnum.enumValues)[number];

export const budgetLinesTable = drizzleSilk(
  pgTable("budget_lines", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    lineType: lineTypeEnum().notNull(),
    editionId: integer()
      .notNull()
      .references(() => editionsTable.id),
    budgetCategoryId: integer()
      .notNull()
      .references(() => budgetCategoriesTable.id),
    estimatedQuantity: smallint().default(1).notNull(),
    estimatedUnitPrice: smallint().default(0).notNull(),
  }),
);

export type BudgetLine = InferSelectModel<typeof budgetLinesTable>;
