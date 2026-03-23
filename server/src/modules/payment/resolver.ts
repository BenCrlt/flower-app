import { field, mutation, query, resolver } from "@gqloom/core";
import _ from "lodash";
import { invoicesTable, paymentsTable, vendorsTable } from "../../db/schema/index.js";
import { user } from "../../db/schema/auth.js";
import { addInvoice, addInvoiceInput } from "./utils/addInvoice.js";
import {
  addOrUpdateVendor,
  addOrUpdateVendorInput,
} from "./utils/addOrUpdateVendor.js";
import { deleteInvoice, deleteInvoiceInput } from "./utils/deleteInvoice.js";
import { deleteVendor, deleteVendorInput } from "./utils/deleteVendor.js";
import { getInvoices, getInvoicesInput } from "./utils/getInvoices.js";
import { getVendors } from "./utils/getVendors.js";
import { loadAuthors } from "./utils/loadAuthors.js";
import { loadPayments } from "./utils/loadPayments.js";
import { loadVendors } from "./utils/loadVendors.js";
import { updateInvoice, updateInvoiceInput } from "./utils/updateInvoice.js";

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
