import { field, mutation, query, resolver } from "@gqloom/core";
import z from "zod";
import { db } from "../../db/index";
import { editionsTable } from "../../db/schema/editions";
import { LineTypeEnum } from "../budget/types";
import { addEdition, addEditionInput } from "./utils/addEdition";
import { deleteEdition, deleteEditionInput } from "./utils/deleteEdition";
import {
  getBudgetStatsByCategories,
  statsByCategoryOutput,
} from "./utils/getBudgetStatsByCategories";
import { getTotalEstimatedForEditions } from "./utils/getTotalEstimatedForEditions";
import { getTotalExpense } from "./utils/getTotalExpense";
import { updateEdition, updateEditionInput } from "./utils/updateEdition";

export const editionsResolver = resolver.of(editionsTable, {
  editions: query(editionsTable.$list()).resolve(() =>
    db.query.editionsTable.findMany(),
  ),
  getBudgetStatsByCategories: query(statsByCategoryOutput)
    .input({ editionId: z.number().min(1), lineType: LineTypeEnum })
    .resolve(async ({ editionId, lineType }) =>
      getBudgetStatsByCategories(editionId, lineType),
    ),

  totalPrevisionnalIncome: field(z.number())
    .derivedFrom("id")
    .load(async (editions) =>
      getTotalEstimatedForEditions(
        editions.map((edition) => edition.id),
        "income",
      ),
    ),
  totalPrevisionnalExpense: field(z.number())
    .derivedFrom("id")
    .load(async (editions) =>
      getTotalEstimatedForEditions(
        editions.map((edition) => edition.id),
        "expense",
      ),
    ),
  totalExpense: field(z.number())
    .derivedFrom("id")
    .load(async (editions) =>
      getTotalExpense(editions.map((edition) => edition.id)),
    ),
  // TODO: When sales module is done
  totalIncome: field(z.number())
    .derivedFrom("id")
    .resolve(() => 0),

  addEdition: mutation(editionsTable.$nullable())
    .input(addEditionInput)
    .resolve(addEdition),
  updateEdition: mutation(editionsTable.$nullable())
    .input(updateEditionInput)
    .resolve(updateEdition),
  deleteEdition: mutation(editionsTable.$nullable())
    .input(deleteEditionInput)
    .resolve(deleteEdition),
});
