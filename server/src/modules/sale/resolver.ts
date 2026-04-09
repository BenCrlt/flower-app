import { field, query, resolver } from "@gqloom/core";
import z from "zod";
import { productsTable } from "../../db/schema/products.js";
import { getProducts, getProductsFilter } from "./utils/getProducts.js";
import { loadSalesCount } from "./utils/loadSalesCount.js";

export const productsResolver = resolver.of(productsTable, {
  products: query(productsTable.$list())
    .input(getProductsFilter)
    .resolve(getProducts),

  salesCount: field(z.number())
    .derivedFrom("id")
    .load(async (products) =>
      loadSalesCount(products.map((product) => product.id)),
    ),
});
