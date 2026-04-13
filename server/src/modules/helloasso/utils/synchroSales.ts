import { eq, inArray } from "drizzle-orm";
import _ from "lodash";
import z from "zod";
import { db } from "../../../db/index.js";
import {
  budgetLinesTable,
  helloAssoConfigTable,
  ordersTable,
  Sale,
  salesTable,
} from "../../../db/schema/index.js";
import { HelloAssoApi } from "../api/index.js";

export const synchroOrdersInput = z.object({
  helloAssoConfigId: z.number().min(1),
  from: z.string(),
  to: z.string(),
});

export async function synchroOrders({
  helloAssoConfigId,
  from,
  to,
}: z.infer<typeof synchroOrdersInput>): Promise<Sale[]> {
  const helloAssoApi = new HelloAssoApi();

  const config = await db.query.helloAssoConfigTable.findFirst({
    where: eq(helloAssoConfigTable.id, helloAssoConfigId),
  });

  if (!config) {
    throw new Error("[HelloAsso] SynchroOrders: Config not found");
  }

  const formOrders = await helloAssoApi.getFormOrders(
    config.formSlug,
    from,
    to,
  );

  const tierIds = new Set(
    _.compact(
      formOrders.flatMap(
        (order) => order.items?.map((item) => item.tierId) ?? [],
      ),
    ),
  );

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
    throw new Error("[HelloAsso] SynchroOrders: No budget lines found");
  }

  return db.transaction(async (tx) => {
    const ordersToCreate = formOrders.map((order) => ({
      helloAssoOrderId: order.id,
      executedAt: new Date(order.date),
      editionId: config.editionId,
      payerFirstName: order.payer?.firstName ?? null,
      payerLastName: order.payer?.lastName ?? null,
      payerEmail: order.payer?.email ?? null,
    }));

    if (ordersToCreate.length > 0) {
      await tx
        .insert(ordersTable)
        .values(ordersToCreate)
        .onConflictDoNothing({ target: [ordersTable.helloAssoOrderId] });
    }

    const persistedOrders = await tx.query.ordersTable.findMany({
      where: inArray(
        ordersTable.helloAssoOrderId,
        formOrders.map((order) => order.id),
      ),
      columns: {
        id: true,
        helloAssoOrderId: true,
      },
    });

    const orderIdByHelloAssoOrderId = new Map<number, number>(
      persistedOrders.flatMap((order) =>
        order.helloAssoOrderId ? [[order.helloAssoOrderId, order.id]] : [],
      ),
    );

    const salesToCreate = formOrders.flatMap((order) => {
      const orderId = orderIdByHelloAssoOrderId.get(order.id);
      if (!orderId) {
        return [];
      }

      return (order.items ?? []).flatMap((item) => {
        if (!item.tierId) {
          return [];
        }

        const budgetLineId = budgetLinesByHelloAssoProductId.get(item.tierId);
        if (!budgetLineId) {
          return [];
        }

        return {
          helloAssoSaleItemId: item.id,
          quantity: 1,
          executedAt: new Date(order.date),
          budgetLineId,
          orderId,
        };
      });
    });

    if (!salesToCreate.length) {
      return [];
    }

    return tx
      .insert(salesTable)
      .values(salesToCreate)
      .onConflictDoNothing({ target: [salesTable.helloAssoSaleItemId] })
      .returning();
  });
}
