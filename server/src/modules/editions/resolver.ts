import { field, mutation, query, resolver } from "@gqloom/core";
import { desc, eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../db/index.js";
import { editionsTable } from "../../db/schema/editions.js";
import { LineTypeEnum } from "../budget/types.js";
import { addEdition, addEditionInput } from "./utils/addEdition.js";
import { deleteEdition, deleteEditionInput } from "./utils/deleteEdition.js";
import {
  getBudgetStatsByCategories,
  statsByCategoryOutput,
} from "./utils/getBudgetStatsByCategories.js";
import { getTotalEstimatedForEditions } from "./utils/getTotalEstimatedForEditions.js";
import { getTotalExpense } from "./utils/getTotalExpense.js";
import { updateEdition, updateEditionInput } from "./utils/updateEdition.js";

export const editionsResolver = resolver.of(editionsTable, {
  editions: query(editionsTable.$list()).resolve(() =>
    db.query.editionsTable.findMany({
      orderBy: [desc(editionsTable.active), desc(editionsTable.startDate)],
    }),
  ),
  edition: query(editionsTable.$nullable())
    .input(z.object({ id: z.number().min(1) }))
    .resolve(async ({ id }) =>
      db.query.editionsTable.findFirst({
        where: eq(editionsTable.id, id),
      }),
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
