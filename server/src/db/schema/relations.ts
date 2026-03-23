import { relations } from "drizzle-orm";
import { user } from "./auth.js";
import { budgetCategoriesTable } from "./budget-categories.js";
import { budgetLinesTable } from "./budget-lines.js";
import { editionsTable } from "./editions.js";
import { invoicesTable } from "./invoices.js";
import { paymentsTable } from "./payments.js";
import { productsTable } from "./products.js";
import { salesTable } from "./sales.js";
import { vendorsTable } from "./vendors.js";

export const budgetCategoriesRelations = relations(
  budgetCategoriesTable,
  ({ many }) => ({
    budgetLines: many(budgetLinesTable),
  }),
);

export const budgetLinesRelations = relations(
  budgetLinesTable,
  ({ one, many }) => ({
    budgetCategory: one(budgetCategoriesTable, {
      fields: [budgetLinesTable.budgetCategoryId],
      references: [budgetCategoriesTable.id],
    }),
    edition: one(editionsTable, {
      fields: [budgetLinesTable.editionId],
      references: [editionsTable.id],
    }),
    products: many(productsTable),
    payments: many(paymentsTable),
  }),
);

export const editionsRelations = relations(editionsTable, ({ many }) => ({
  budgetLines: many(budgetLinesTable),
  products: many(productsTable),
  sales: many(salesTable),
  payments: many(paymentsTable),
  invoices: many(invoicesTable),
}));

export const paymentsRelations = relations(paymentsTable, ({ one }) => ({
  edition: one(editionsTable, {
    fields: [paymentsTable.editionId],
    references: [editionsTable.id],
  }),
  budgetLine: one(budgetLinesTable, {
    fields: [paymentsTable.budgetLineId],
    references: [budgetLinesTable.id],
  }),
  invoice: one(invoicesTable, {
    fields: [paymentsTable.invoiceId],
    references: [invoicesTable.id],
  }),
}));

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  budgetLine: one(budgetLinesTable, {
    fields: [productsTable.budgetLineId],
    references: [budgetLinesTable.id],
  }),
  edition: one(editionsTable, {
    fields: [productsTable.editionId],
    references: [editionsTable.id],
  }),
  sales: many(salesTable),
}));

export const invoicesRelations = relations(invoicesTable, ({ one, many }) => ({
  edition: one(editionsTable, {
    fields: [invoicesTable.editionId],
    references: [editionsTable.id],
  }),
  vendor: one(vendorsTable, {
    fields: [invoicesTable.vendorId],
    references: [vendorsTable.id],
  }),
  author: one(user, {
    fields: [invoicesTable.authorId],
    references: [user.id],
  }),
  payments: many(paymentsTable),
}));

export const salesRelations = relations(salesTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [salesTable.productId],
    references: [productsTable.id],
  }),
  edition: one(editionsTable, {
    fields: [salesTable.editionId],
    references: [editionsTable.id],
  }),
  author: one(user, {
    fields: [salesTable.authorId],
    references: [user.id],
  }),
}));

export const usersRelations = relations(user, ({ many }) => ({
  sales: many(salesTable),
  payments: many(paymentsTable),
  invoices: many(invoicesTable),
}));

export const vendorsRelations = relations(vendorsTable, ({ many }) => ({
  invoices: many(invoicesTable),
}));
