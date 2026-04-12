import z from "zod";
import { db } from "../../../db/index.js";
import {
  HelloAssoConfig,
  helloAssoConfigTable,
} from "../../../db/schema/hello-asso-config.js";
import { importProducts } from "./importProducts.js";

export const addHelloAssoConfigInput = z.object({
  formSlug: z.string().min(1).max(255),
  editionId: z.number().min(1),
  importProductFromHelloAsso: z.boolean().default(true),
  budgetCategoryId: z.number().min(1).optional(),
});

export async function addHelloAssoConfig({
  editionId,
  formSlug,
  importProductFromHelloAsso,
  budgetCategoryId,
}: z.infer<typeof addHelloAssoConfigInput>): Promise<HelloAssoConfig | null> {
  const config = await db
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

  if (config && importProductFromHelloAsso && budgetCategoryId) {
    await importProducts(config, budgetCategoryId);
  }
  return config;
}
