import { defineRelations } from "drizzle-orm";
import { budgetCategoriesTable } from "./budget-categories.js";
import { budgetLinesTable } from "./budget-lines.js";
import { editionsTable } from "./editions.js";
import { paymentsTable } from "./payments.js";
import { productsTable } from "./products.js";
import { receiptsTable } from "./receipts.js";
import { salesTable } from "./sales.js";
import { usersTable } from "./users.js";
import { vendorsTable } from "./vendors.js";

export const budgetCategoriesRelations = defineRelations(
  { budgetCategoriesTable, budgetLinesTable },
  (r) => ({
    budgetCategoriesTable: {
      budgetLines: r.many.budgetLinesTable({
        from: r.budgetCategoriesTable.id,
        to: r.budgetLinesTable.budgetCategoryId,
      }),
    },
  }),
);

export const budgetLinesRelations = defineRelations(
  {
    budgetLinesTable,
    budgetCategoriesTable,
    editionsTable,
    productsTable,
    paymentsTable,
  },
  (r) => ({
    budgetLinesTable: {
      budgetCategory: r.one.budgetCategoriesTable({
        from: r.budgetLinesTable.budgetCategoryId,
        to: r.budgetCategoriesTable.id,
      }),
      edition: r.one.editionsTable({
        from: r.budgetLinesTable.editionId,
        to: r.editionsTable.id,
      }),
      products: r.many.productsTable({
        from: r.budgetLinesTable.id,
        to: r.productsTable.budgetLineId,
      }),
      payments: r.many.paymentsTable({
        from: r.budgetLinesTable.id,
        to: r.paymentsTable.budgetLineId,
      }),
    },
  }),
);

export const editionsRelations = defineRelations(
  {
    editionsTable,
    budgetLinesTable,
    productsTable,
    salesTable,
    paymentsTable,
    receiptsTable,
  },
  (r) => ({
    editionsTable: {
      budgetLines: r.many.budgetLinesTable({
        from: r.editionsTable.id,
        to: r.budgetLinesTable.editionId,
      }),
      products: r.many.productsTable({
        from: r.editionsTable.id,
        to: r.productsTable.editionId,
      }),
      sales: r.many.salesTable({
        from: r.editionsTable.id,
        to: r.salesTable.editionId,
      }),
      payments: r.many.paymentsTable({
        from: r.editionsTable.id,
        to: r.paymentsTable.editionId,
      }),
      receipts: r.many.receiptsTable({
        from: r.editionsTable.id,
        to: r.receiptsTable.editionId,
      }),
    },
  }),
);

export const paymentsRelations = defineRelations(
  {
    paymentsTable,
    editionsTable,
    budgetLinesTable,
    receiptsTable,
    usersTable,
  },
  (r) => ({
    paymentsTable: {
      edition: r.one.editionsTable({
        from: r.paymentsTable.editionId,
        to: r.editionsTable.id,
      }),
      budgetLine: r.one.budgetLinesTable({
        from: r.paymentsTable.budgetLineId,
        to: r.budgetLinesTable.id,
      }),
      receipt: r.one.receiptsTable({
        from: r.paymentsTable.receiptId,
        to: r.receiptsTable.id,
      }),
      author: r.one.usersTable({
        from: r.paymentsTable.authorId,
        to: r.usersTable.id,
      }),
    },
  }),
);

export const productsRelations = defineRelations(
  { productsTable, budgetLinesTable, editionsTable, salesTable },
  (r) => ({
    productsTable: {
      budgetLine: r.one.budgetLinesTable({
        from: r.productsTable.budgetLineId,
        to: r.budgetLinesTable.id,
      }),
      edition: r.one.editionsTable({
        from: r.productsTable.editionId,
        to: r.editionsTable.id,
      }),
      sales: r.many.salesTable({
        from: r.productsTable.id,
        to: r.salesTable.productId,
      }),
    },
  }),
);

export const receiptsRelations = defineRelations(
  { receiptsTable, editionsTable, vendorsTable, usersTable, paymentsTable },
  (r) => ({
    receiptsTable: {
      edition: r.one.editionsTable({
        from: r.receiptsTable.editionId,
        to: r.editionsTable.id,
      }),
      vendor: r.one.vendorsTable({
        from: r.receiptsTable.vendorId,
        to: r.vendorsTable.id,
      }),
      author: r.one.usersTable({
        from: r.receiptsTable.authorId,
        to: r.usersTable.id,
      }),
      payments: r.many.paymentsTable({
        from: r.receiptsTable.id,
        to: r.paymentsTable.receiptId,
      }),
    },
  }),
);

export const salesRelations = defineRelations(
  { salesTable, productsTable, editionsTable, usersTable },
  (r) => ({
    salesTable: {
      product: r.one.productsTable({
        from: r.salesTable.productId,
        to: r.productsTable.id,
      }),
      edition: r.one.editionsTable({
        from: r.salesTable.editionId,
        to: r.editionsTable.id,
      }),
      author: r.one.usersTable({
        from: r.salesTable.authorId,
        to: r.usersTable.id,
      }),
    },
  }),
);

export const usersRelations = defineRelations(
  { usersTable, salesTable, paymentsTable, receiptsTable },
  (r) => ({
    usersTable: {
      sales: r.many.salesTable({
        from: r.usersTable.id,
        to: r.salesTable.authorId,
      }),
      payments: r.many.paymentsTable({
        from: r.usersTable.id,
        to: r.paymentsTable.authorId,
      }),
      receipts: r.many.receiptsTable({
        from: r.usersTable.id,
        to: r.receiptsTable.authorId,
      }),
    },
  }),
);

export const vendorsRelations = defineRelations(
  { vendorsTable, receiptsTable },
  (r) => ({
    vendorsTable: {
      receipts: r.many.receiptsTable({
        from: r.vendorsTable.id,
        to: r.receiptsTable.vendorId,
      }),
    },
  }),
);
