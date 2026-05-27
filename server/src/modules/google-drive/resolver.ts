import { field, mutation, query, resolver } from "@gqloom/core";
import z from "zod";
import { invoiceFilesTable } from "../../db/schema/invoice-files.js";
import {
  deleteInvoiceFile,
  deleteInvoiceFileInput,
} from "./utils/deleteInvoiceFile.js";
import {
  disconnectGoogleDrive,
  disconnectGoogleDriveInput,
} from "./utils/disconnectGoogleDrive.js";
import {
  getGoogleDriveConfigView,
  googleDriveConfigViewSchema,
} from "./utils/getGoogleDriveConfigView.js";
import { loadInvoiceFiles } from "./utils/loadInvoiceFiles.js";
import {
  updateGoogleDriveConfig,
  updateGoogleDriveConfigInput,
} from "./utils/updateGoogleDriveConfig.js";

const googleDriveConfigQueryInput = z.object({
  editionId: z.number().min(1),
});

export const googleDriveResolver = resolver({
  googleDriveConfig: query(googleDriveConfigViewSchema)
    .input(googleDriveConfigQueryInput)
    .resolve(({ editionId }) => getGoogleDriveConfigView(editionId)),

  updateGoogleDriveConfig: mutation(googleDriveConfigViewSchema)
    .input(updateGoogleDriveConfigInput)
    .resolve(updateGoogleDriveConfig),

  disconnectGoogleDrive: mutation(googleDriveConfigViewSchema)
    .input(disconnectGoogleDriveInput)
    .resolve(disconnectGoogleDrive),

  deleteInvoiceFile: mutation(z.boolean())
    .input(deleteInvoiceFileInput)
    .resolve(deleteInvoiceFile),
});

export const invoiceFilesField = field(invoiceFilesTable.$list());
export { loadInvoiceFiles };
