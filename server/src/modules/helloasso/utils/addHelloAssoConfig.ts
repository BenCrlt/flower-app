import z from "zod";
import { db } from "../../../db/index.js";
import {
  HelloAssoConfig,
  helloAssoConfigTable,
} from "../../../db/schema/hello-asso-config.js";

export const addHelloAssoConfigInput = z.object({
  formSlug: z.string().min(1).max(255),
  editionId: z.number().min(1),
});

export function addHelloAssoConfig({
  editionId,
  formSlug,
}: z.infer<typeof addHelloAssoConfigInput>): Promise<HelloAssoConfig | null> {
  return db
    .insert(helloAssoConfigTable)
    .values({
      editionId,
      formSlug,
    })
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
}
