import { field, mutation, query, resolver } from "@gqloom/core";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  budgetLinesTable,
  orderOriginsTable,
  ordersTable,
  salesTable,
  user,
} from "../../db/schema/index.js";
import { db } from "../../index.js";
import { loadAuthors } from "../payment/utils/loadAuthors.js";
import {
  addOrUpdateOrderOrigin,
  addOrUpdateOrderOriginInput,
} from "./utils/addOrUpdateOrderOrigin.js";
import {
  deleteOrderOrigin,
  deleteOrderOriginInput,
} from "./utils/deleteOrderOrigin.js";
import {
  getOrderOrigins,
  getOrderOriginsInput,
} from "./utils/getOrderOrigins.js";
import { getOrders, getOrdersInput } from "./utils/getOrders.js";
import { loadBudgetLines } from "./utils/loadBudgetLines.js";
import { loadOrderOrigins } from "./utils/loadOrderOrigins.js";
import { loadSales } from "./utils/loadSales.js";
import { loadTotalAmount } from "./utils/loadTotalAmout.js";

export const orderResolver = resolver.of(ordersTable, {
  orders: query(ordersTable.$list()).input(getOrdersInput).resolve(getOrders),

  totalAmount: field(z.number())
    .derivedFrom("id")
    .load(async (orders) => {
      return loadTotalAmount(orders.map((order) => order.id));
    }),

  sales: field(salesTable.$list())
    .derivedFrom("id")
    .load(async (orders) => {
      return loadSales(orders.map((order) => order.id));
    }),

  author: field(user.$nullable())
    .derivedFrom("authorId")
    .load(async (orders) => loadAuthors(orders.map((order) => order.authorId))),
  origin: field(orderOriginsTable.$nullable())
    .derivedFrom("originId")
    .load(async (orders) =>
      loadOrderOrigins(orders.map((order) => order.originId)),
    ),
});

export const salesResolver = resolver.of(salesTable, {
  budgetLine: field(budgetLinesTable.$nullable())
    .derivedFrom("budgetLineId")
    .load(async (sales) =>
      loadBudgetLines(sales.map((sale) => sale.budgetLineId)),
    ),
});

export const orderOriginResolver = resolver.of(orderOriginsTable, {
  orderOrigin: query(orderOriginsTable.$nullable())
    .input(z.object({ id: z.number().min(1) }))
    .resolve(async ({ id }) =>
      db.query.orderOriginsTable.findFirst({
        where: eq(orderOriginsTable.id, id),
      }),
    ),
  orderOrigins: query(orderOriginsTable.$list())
    .input(getOrderOriginsInput)
    .resolve(getOrderOrigins),

  addOrUpdateOrderOrigin: mutation(orderOriginsTable.$nullable())
    .input(addOrUpdateOrderOriginInput)
    .resolve(addOrUpdateOrderOrigin),

  deleteOrderOrigin: mutation(orderOriginsTable.$nullable())
    .input(deleteOrderOriginInput)
    .resolve(deleteOrderOrigin),
});
