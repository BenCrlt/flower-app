import { eq } from "drizzle-orm";
import z from "zod";
import {
  HelloAssoMapping,
  helloAssoMappingTable,
} from "../../../db/schema/hello-asso-mapping.js";
import { db } from "../../../index.js";

export const addOrUpdateMappingInput = z.object({
  id: z.number().min(1).optional(),
  configId: z.number().min(1),
  helloAssoProductId: z.number().min(1),
  productId: z.number().min(1),
});

export async function addOrUpdateMapping({
  id,
  configId,
  helloAssoProductId,
  productId,
}: z.infer<typeof addOrUpdateMappingInput>): Promise<HelloAssoMapping | null> {
  if (id) {
    return db
      .update(helloAssoMappingTable)
      .set({
        configId,
        helloAssoProductId,
        productId,
      })
      .where(eq(helloAssoMappingTable.id, id))
      .returning()
      .then((result) => result[0] ?? null);
  }

  return db
    .insert(helloAssoMappingTable)
    .values({
      configId,
      helloAssoProductId,
      productId,
    })
    .returning()
    .then((result) => result[0] ?? null);
}
