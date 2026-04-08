import { eq } from "drizzle-orm";
import z from "zod";
import { Product, productsTable } from "../../../db/schema/index.js";
import { db } from "../../../index.js";

export const getProductsFilter = z.object({
  editionId: z.number().min(1),
});

export function getProducts({
  editionId,
}: z.infer<typeof getProductsFilter>): Promise<Product[]> {
  return db.query.productsTable.findMany({
    where: eq(productsTable.editionId, editionId),
  });
}
