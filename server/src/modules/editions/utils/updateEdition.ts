import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { Edition, editionsTable } from "../../../db/schema/editions";

export const updateEditionInput = z.object({
  id: z.number().min(1),
  name: z.string().min(2).max(100).optional(),
  startDate: z.string().date().optional(),
});

export const updateEdition = async (
  input: z.infer<typeof updateEditionInput>,
): Promise<Edition | null> => {
  const { id, ...fieldsToUpdate } = input;
  return db
    .update(editionsTable)
    .set(fieldsToUpdate)
    .where(eq(editionsTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
