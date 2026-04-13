import { format, subYears } from "date-fns";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  HelloAssoConfig,
  helloAssoConfigTable,
} from "../../../db/schema/hello-asso-config.js";
import { importProducts } from "./importProducts.js";
import { synchroOrders } from "./synchroOrders.js";

export const addHelloAssoConfigInput = z.object({
  formSlug: z.string().min(1).max(255),
  editionId: z.number().min(1),
  enableSynchro: z.boolean().default(true),
  budgetCategoryId: z.number().min(1).optional(),
});

export async function addHelloAssoConfig({
  editionId,
  formSlug,
  enableSynchro,
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

  if (config && enableSynchro && budgetCategoryId) {
    const now = new Date();
    const from = format(subYears(now, 1), "yyyy-MM-dd");
    const to = format(now, "yyyy-MM-dd");

    await importProducts(config, budgetCategoryId);
    await synchroOrders({ helloAssoConfigId: config.id, from, to });
  }
  return config;
}
