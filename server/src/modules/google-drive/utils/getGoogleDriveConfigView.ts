import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { googleDriveConfigTable } from "../../../db/schema/google-drive-config.js";

export const googleDriveConfigViewSchema = z.object({
  editionId: z.number(),
  isConnected: z.boolean(),
  invoiceFolderId: z.string().nullable(),
  googleAccountEmail: z.string().nullable(),
  connectedAt: z.date().nullable(),
});

export type GoogleDriveConfigView = z.infer<typeof googleDriveConfigViewSchema>;

export async function getGoogleDriveConfigView(
  editionId: number,
): Promise<GoogleDriveConfigView> {
  const config = await db.query.googleDriveConfigTable.findFirst({
    where: eq(googleDriveConfigTable.editionId, editionId),
  });

  if (!config) {
    return {
      editionId,
      isConnected: false,
      invoiceFolderId: null,
      googleAccountEmail: null,
      connectedAt: null,
    };
  }

  return {
    editionId,
    isConnected: true,
    invoiceFolderId: config.invoiceFolderId ?? null,
    googleAccountEmail: config.googleAccountEmail ?? null,
    connectedAt: config.connectedAt,
  };
}
