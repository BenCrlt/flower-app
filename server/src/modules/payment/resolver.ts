import { field, mutation, query, resolver } from "@gqloom/core";
import _ from "lodash";
import { invoicesTable, paymentsTable, vendorsTable } from "../../db/schema";
import { user } from "../../db/schema/auth";
import { addInvoice, addInvoiceInput } from "./utils/addInvoice";
import {
  addOrUpdateVendor,
  addOrUpdateVendorInput,
} from "./utils/addOrUpdateVendor";
import { deleteInvoice, deleteInvoiceInput } from "./utils/deleteInvoice";
import { deleteVendor, deleteVendorInput } from "./utils/deleteVendor";
import { getInvoices, getInvoicesInput } from "./utils/getInvoices";
import { getVendors } from "./utils/getVendors";
import { loadAuthors } from "./utils/loadAuthors";
import { loadPayments } from "./utils/loadPayments";
import { loadVendors } from "./utils/loadVendors";
import { updateInvoice, updateInvoiceInput } from "./utils/updateInvoice";

export const invoiceResolver = resolver.of(invoicesTable, {
  invoices: query(invoicesTable.$list())
    .input(getInvoicesInput)
    .resolve(getInvoices),

  payments: field(paymentsTable.$list())
    .derivedFrom("id")
    .load(async (invoices) => loadPayments(_.map(invoices, "id"))),
  author: field(user.$nullable())
    .derivedFrom("authorId")
    .load(async (invoices) => loadAuthors(_.map(invoices, "authorId"))),
  vendor: field(vendorsTable.$nullable())
    .derivedFrom("vendorId")
    .load(async (invoices) => loadVendors(_.map(invoices, "vendorId"))),

  addInvoice: mutation(invoicesTable.$nullable())
    .input(addInvoiceInput)
    .resolve(addInvoice),
  deleteInvoice: mutation(invoicesTable.$nullable())
    .input(deleteInvoiceInput)
    .resolve(deleteInvoice),
  updateInvoice: mutation(invoicesTable.$nullable())
    .input(updateInvoiceInput)
    .resolve(updateInvoice),
});

export const vendorResolver = resolver.of(vendorsTable, {
  vendors: query(vendorsTable.$list()).resolve(getVendors),

  addOrUpdateVendor: mutation(vendorsTable.$nullable())
    .input(addOrUpdateVendorInput)
    .resolve(addOrUpdateVendor),
  deleteVendor: mutation(vendorsTable.$nullable())
    .input(deleteVendorInput)
    .resolve(deleteVendor),
});
