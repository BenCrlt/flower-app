import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { Edition, editionsTable } from "../../../db/schema/editions.js";

export const updateEditionInput = z.object({
  id: z.number().min(1),
  name: z.string().min(2).max(100).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const updateEdition = async (
  input: z.infer<typeof updateEditionInput>,
): Promise<Edition | null> => {
  const { id, ...fieldsToUpdate } = input;
  return db
    .update(editionsTable)
    .set({
      ...fieldsToUpdate,
      startDate: fieldsToUpdate.startDate
        ? new Date(fieldsToUpdate.startDate)
        : undefined,
      endDate: fieldsToUpdate.endDate
        ? new Date(fieldsToUpdate.endDate)
        : undefined,
    })
    .where(eq(editionsTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
