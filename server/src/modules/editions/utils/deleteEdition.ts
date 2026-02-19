import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { editionsTable } from "../../../db/schema";

export const deleteEditionInput = z.object({
  id: z.number(),
});

export const deleteEdition = async ({
  id,
}: z.infer<typeof deleteEditionInput>) => {
  return db
    .delete(editionsTable)
    .where(eq(editionsTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
