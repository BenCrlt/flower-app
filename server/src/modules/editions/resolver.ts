import { field, mutation, query, resolver } from "@gqloom/core";
import z from "zod";
import { db } from "../../db/index";
import { editionsTable } from "../../db/schema/editions";
import { addEdition, addEditionInput } from "./utils/addEdition";
import { deleteEdition, deleteEditionInput } from "./utils/deleteEdition";
import { getTotalEstimatedForEditions } from "./utils/getTotalEstimatedForEditions";
import { updateEdition, updateEditionInput } from "./utils/updateEdition";

export const editionsResolver = resolver.of(editionsTable, {
  editions: query(editionsTable.$list()).resolve(() =>
    db.query.editionsTable.findMany(),
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
