import { mutation, query, resolver } from "@gqloom/core";
import { db } from "../../db/index";
import { editionsTable } from "../../db/schema/editions";
import { addEdition, addEditionInput } from "./utils/addEdition";
import { deleteEdition, deleteEditionInput } from "./utils/deleteEdition";
import { updateEdition, updateEditionInput } from "./utils/updateEdition";

export const editionsResolver = resolver.of(editionsTable, {
  editions: query(editionsTable.$list()).resolve(() =>
    db.query.editionsTable.findMany(),
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
