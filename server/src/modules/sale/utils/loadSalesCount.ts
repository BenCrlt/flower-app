import { eq, inArray, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { productsTable } from "../../../db/schema/products.js";
import { salesTable } from "../../../db/schema/sales.js";

export const loadSalesCount = async (
  productIds: number[],
): Promise<number[]> => {
  const salesCountByProductId = await db
    .select({
      productId: productsTable.id,
      salesCount: sql<number>`sum(${salesTable.quantity})`,
    })
    .from(productsTable)
    .innerJoin(salesTable, eq(productsTable.id, salesTable.productId))
    .where(inArray(productsTable.id, productIds))
    .groupBy(productsTable.id)
    .then((rows) =>
      rows.reduce(
        (map, row) => map.set(row.productId, row.salesCount),
        new Map<number, number>(),
      ),
    );

  return productIds.map(
    (productId) => salesCountByProductId.get(productId) ?? 0,
  );
};
