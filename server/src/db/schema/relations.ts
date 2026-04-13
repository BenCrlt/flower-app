import { relations } from "drizzle-orm";
import { user } from "./auth.js";
import { budgetCategoriesTable } from "./budget-categories.js";
import { budgetLinesTable } from "./budget-lines.js";
import { editionsTable } from "./editions.js";
import { invoicesTable } from "./invoices.js";
import { ordersTable } from "./orders.js";
import { paymentsTable } from "./payments.js";
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
    sales: many(salesTable),
    payments: many(paymentsTable),
  }),
);

export const editionsRelations = relations(editionsTable, ({ many }) => ({
  budgetLines: many(budgetLinesTable),
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
  budgetLine: one(budgetLinesTable, {
    fields: [salesTable.budgetLineId],
    references: [budgetLinesTable.id],
  }),
  order: one(ordersTable, {
    fields: [salesTable.orderId],
    references: [ordersTable.id],
  }),
}));

export const ordersRelations = relations(ordersTable, ({ one, many }) => ({
  edition: one(editionsTable, {
    fields: [ordersTable.editionId],
    references: [editionsTable.id],
  }),
  author: one(user, {
    fields: [ordersTable.authorId],
    references: [user.id],
  }),
  sales: many(salesTable),
}));

export const usersRelations = relations(user, ({ many }) => ({
  sales: many(salesTable),
  payments: many(paymentsTable),
  invoices: many(invoicesTable),
}));

export const vendorsRelations = relations(vendorsTable, ({ many }) => ({
  invoices: many(invoicesTable),
}));
