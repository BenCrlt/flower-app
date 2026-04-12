import { eq, inArray } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  budgetLinesTable,
  helloAssoConfigTable,
  Sale,
  salesTable,
} from "../../../db/schema/index.js";
import { HelloAssoApi } from "../api/index.js";

export const synchroSalesInput = z.object({
  helloAssoConfigId: z.number().min(1),
  from: z.string(),
  to: z.string(),
});

export async function synchroSales({
  helloAssoConfigId,
  from,
  to,
}: z.infer<typeof synchroSalesInput>): Promise<Sale[]> {
  const helloAssoApi = new HelloAssoApi();

  const config = await db.query.helloAssoConfigTable.findFirst({
    where: eq(helloAssoConfigTable.id, helloAssoConfigId),
  });

  if (!config) {
    throw new Error("[HelloAsso] SynchroSales: Config not found");
  }

  const formItems = await helloAssoApi.getFormItems(config.formSlug, from, to);

  const tierIds = new Set(formItems.map((item) => item.tierId));

  const budgetLinesByHelloAssoProductId = await db.query.budgetLinesTable
    .findMany({
      where: inArray(budgetLinesTable.helloAssoProductId, Array.from(tierIds)),
    })
    .then((rows) =>
      rows.reduce((map, row) => {
        if (row.helloAssoProductId) {
          map.set(row.helloAssoProductId, row.id);
        }
        return map;
      }, new Map<number, number>()),
    );

  if (!budgetLinesByHelloAssoProductId.size) {
    throw new Error("[HelloAsso] SynchroSales: No budget lines found");
  }

  const salesToCreate: Omit<Sale, "id" | "authorId">[] = formItems.flatMap(
    (item) => {
      const budgetLineId = budgetLinesByHelloAssoProductId.get(item.tierId);
      if (!budgetLineId) {
        return [];
      }
      return {
        helloAssoSaleItemId: item.id,
        quantity: 1,
        executedAt: new Date(item.order.date),
        budgetLineId,
        editionId: config.editionId,
      };
    },
  );

  return db
    .insert(salesTable)
    .values(salesToCreate)
    .onConflictDoNothing({ target: [salesTable.helloAssoSaleItemId] })
    .returning();
}
