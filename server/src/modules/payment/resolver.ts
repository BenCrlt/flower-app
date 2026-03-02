import { mutation, query, resolver } from "@gqloom/core";
import { invoicesTable, vendorsTable } from "../../db/schema";
import { addInvoice, addInvoiceInput } from "./utils/addInvoice";
import {
  addOrUpdateVendor,
  addOrUpdateVendorInput,
} from "./utils/addOrUpdateVendor";
import { deleteInvoice, deleteInvoiceInput } from "./utils/deleteInvoice";
import { deleteVendor, deleteVendorInput } from "./utils/deleteVendor";
import { getInvoices, getInvoicesInput } from "./utils/getInvoices";
import { getVendors } from "./utils/getVendors";

export const invoiceResolver = resolver.of(invoicesTable, {
  invoices: query(invoicesTable.$list())
    .input(getInvoicesInput)
    .resolve(getInvoices),

  addInvoice: mutation(invoicesTable.$nullable())
    .input(addInvoiceInput)
    .resolve(addInvoice),
  deleteInvoice: mutation(invoicesTable.$nullable())
    .input(deleteInvoiceInput)
    .resolve(deleteInvoice),
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
