import { field, query, resolver } from "@gqloom/core";
import _ from "lodash";
import { z } from "zod";
import {
  budgetLinesTable,
  ordersTable,
  salesTable,
  user,
} from "../../db/schema/index.js";
import { loadAuthors } from "../payment/utils/loadAuthors.js";
import { getOrders, getOrdersInput } from "./utils/getOrders.js";
import { loadBudgetLines } from "./utils/loadBudgetLines.js";
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
    .load(async (orders) => loadAuthors(_.map(orders, "authorId"))),
});

export const salesResolver = resolver.of(salesTable, {
  budgetLine: field(budgetLinesTable.$nullable())
    .derivedFrom("budgetLineId")
    .load(async (sales) =>
      loadBudgetLines(sales.map((sale) => sale.budgetLineId)),
    ),
});
