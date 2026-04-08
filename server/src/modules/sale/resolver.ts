import { query, resolver } from "@gqloom/core";
import { productsTable } from "../../db/schema/products.js";
import { getProducts, getProductsFilter } from "./utils/getProducts.js";

export const productsResolver = resolver.of(productsTable, {
  products: query(productsTable.$list())
    .input(getProductsFilter)
    .resolve(getProducts),
});
