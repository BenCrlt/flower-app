import z from "zod";
import { db } from "../../../db/index.js";
import { Edition, editionsTable } from "../../../db/schema/index.js";

export const addEditionInput = z.object({
  name: z.string(),
  startDate: z.string().date(),
  active: z.boolean().default(false),
});

export const addEdition = async (
  input: z.infer<typeof addEditionInput>,
): Promise<Edition | null> => {
  return db
    .insert(editionsTable)
    .values(input)
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
