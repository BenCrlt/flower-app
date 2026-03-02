import { relations } from "drizzle-orm";
import { budgetCategoriesTable } from "./budget-categories";
import { budgetLinesTable } from "./budget-lines";
import { editionsTable } from "./editions";
import { invoicesTable } from "./invoices";
import { paymentsTable } from "./payments";
import { productsTable } from "./products";
import { salesTable } from "./sales";
import { usersTable } from "./users";
import { vendorsTable } from "./vendors";

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
  author: one(usersTable, {
    fields: [paymentsTable.authorId],
    references: [usersTable.id],
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
  author: one(usersTable, {
    fields: [invoicesTable.authorId],
    references: [usersTable.id],
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
  author: one(usersTable, {
    fields: [salesTable.authorId],
    references: [usersTable.id],
  }),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
  sales: many(salesTable),
  payments: many(paymentsTable),
  invoices: many(invoicesTable),
}));

export const vendorsRelations = relations(vendorsTable, ({ many }) => ({
  invoices: many(invoicesTable),
}));
