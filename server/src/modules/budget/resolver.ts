import { field, mutation, query, resolver } from "@gqloom/core";
import z from "zod";
import { db } from "../../db/index.js";
import { budgetCategoriesTable } from "../../db/schema/budget-categories.js";
import { budgetLinesTable } from "../../db/schema/budget-lines.js";
import {
  addBudgetCategory,
  addBudgetCategoryInput,
} from "./utils/addBudgetCategory.js";
import { addBudgetLine, addBudgetLineInput } from "./utils/addBudgetLine.js";
import {
  deleteBudgetCategory,
  deleteBudgetCategoryInput,
} from "./utils/deleteBudgetCategory.js";
import {
  deleteBudgetLine,
  deleteBudgetLineInput,
} from "./utils/deleteBudgetLine.js";
import { getBudgetLines, getBudgetLinesFilter } from "./utils/getBudgetLines.js";
import { loadBudgetCategory } from "./utils/loadBudgetCategory.js";
import { loadRealCost } from "./utils/loadRealData.js";
import {
  updateBudgetCategory,
  updateBudgetCategoryInput,
} from "./utils/updateBudgetCategory.js";
import {
  updateBudgetLine,
  updateBudgetLineInput,
} from "./utils/updateBudgetLine.js";

export const budgetCategoriesResolver = resolver.of(budgetCategoriesTable, {
  budgetCategories: query(budgetCategoriesTable.$list()).resolve(() =>
    db.query.budgetCategoriesTable.findMany(),
  ),
  addBudgetCategory: mutation(budgetCategoriesTable.$nullable())
    .input(addBudgetCategoryInput)
    .resolve(addBudgetCategory),
  updateBudgetCategory: mutation(budgetCategoriesTable.$nullable())
    .input(updateBudgetCategoryInput)
    .resolve(updateBudgetCategory),
  deleteBudgetCategory: mutation(budgetCategoriesTable.$nullable())
    .input(deleteBudgetCategoryInput)
    .resolve(deleteBudgetCategory),
});

export const budgetLinesResolver = resolver.of(budgetLinesTable, {
  budgetLines: query(budgetLinesTable.$list())
    .input(getBudgetLinesFilter)
    .resolve(getBudgetLines),

  category: field(budgetCategoriesTable.$nullable())
    .derivedFrom("budgetCategoryId")
    .load(async (lines) =>
      loadBudgetCategory(lines.map((line) => line.budgetCategoryId)),
    ),

  realCost: field(z.number().int().min(0).nullable())
    .derivedFrom("id")
    .load(async (lines) => loadRealCost(lines.map((line) => line.id))),

  addBudgetLine: mutation(budgetLinesTable.$nullable())
    .input(addBudgetLineInput)
    .resolve(addBudgetLine),
  updateBudgetLine: mutation(budgetLinesTable.$nullable())
    .input(updateBudgetLineInput)
    .resolve(updateBudgetLine),
  deleteBudgetLine: mutation(budgetLinesTable.$nullable())
    .input(deleteBudgetLineInput)
    .resolve(deleteBudgetLine),
});
