import { mutation, query, resolver } from "@gqloom/core";
import { db } from "../../db/index";
import { budgetCategoriesTable } from "../../db/schema/budget-categories";
import { budgetLinesTable } from "../../db/schema/budget-lines";
import {
  addBudgetCategory,
  addBudgetCategoryInput,
} from "./utils/addBudgetCategory";
import {
  deleteBudgetCategory,
  deleteBudgetCategoryInput,
} from "./utils/deleteBudgetCategory";
import {
  updateBudgetCategory,
  updateBudgetCategoryInput,
} from "./utils/updateBudgetCategory";
import { addBudgetLine, addBudgetLineInput } from "./utils/addBudgetLine";
import {
  deleteBudgetLine,
  deleteBudgetLineInput,
} from "./utils/deleteBudgetLine";
import {
  updateBudgetLine,
  updateBudgetLineInput,
} from "./utils/updateBudgetLine";

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
  budgetLines: query(budgetLinesTable.$list()).resolve(() =>
    db.query.budgetLinesTable.findMany(),
  ),
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
