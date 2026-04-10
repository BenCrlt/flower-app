import { eq } from "drizzle-orm";
import z from "zod/v3";
import { db } from "../../../db/index.js";
import {
  HelloAssoConfig,
  helloAssoConfigTable,
} from "../../../db/schema/hello-asso-config.js";

export const updateHelloAssoConfigInput = z.object({
  id: z.number().min(1),
  formSlug: z.string().min(1).max(255),
});

export function updateHelloAssoConfig({
  id,
  formSlug,
}: z.infer<
  typeof updateHelloAssoConfigInput
>): Promise<HelloAssoConfig | null> {
  return db
    .update(helloAssoConfigTable)
    .set({
      formSlug,
    })
    .where(eq(helloAssoConfigTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
}
