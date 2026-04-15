import z from "zod";
import { db } from "../../../db/index.js";
import { Edition, editionsTable } from "../../../db/schema/index.js";

export const addEditionInput = z.object({
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  active: z.boolean().default(false),
});

export const addEdition = async (
  input: z.infer<typeof addEditionInput>,
): Promise<Edition | null> => {
  return db
    .insert(editionsTable)
    .values({
      ...input,
      startDate: new Date(input.startDate),
      endDate: new Date(input.endDate),
    })
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
