import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { googleDriveConfigTable } from "../../../db/schema/google-drive-config.js";
import {
  getGoogleDriveConfigView,
  GoogleDriveConfigView,
} from "./getGoogleDriveConfigView.js";

export const updateGoogleDriveConfigInput = z.object({
  editionId: z.number().min(1),
  invoiceFolderId: z.string().min(1).max(255),
});

export async function updateGoogleDriveConfig({
  editionId,
  invoiceFolderId,
}: z.infer<typeof updateGoogleDriveConfigInput>): Promise<GoogleDriveConfigView> {
  const existing = await db.query.googleDriveConfigTable.findFirst({
    where: eq(googleDriveConfigTable.editionId, editionId),
  });

  if (!existing) {
    throw new Error("Google Drive n'est pas connecté pour cette édition");
  }

  await db
    .update(googleDriveConfigTable)
    .set({ invoiceFolderId })
    .where(eq(googleDriveConfigTable.editionId, editionId));

  return getGoogleDriveConfigView(editionId);
}
