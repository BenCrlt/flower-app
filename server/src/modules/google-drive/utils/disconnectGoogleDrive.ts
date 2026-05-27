import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { googleDriveConfigTable } from "../../../db/schema/google-drive-config.js";
import { GoogleDriveClient } from "../api/client.js";
import { decryptToken } from "./encryptToken.js";
import {
  getGoogleDriveConfigView,
  GoogleDriveConfigView,
} from "./getGoogleDriveConfigView.js";

export const disconnectGoogleDriveInput = z.object({
  editionId: z.number().min(1),
});

export async function disconnectGoogleDrive({
  editionId,
}: z.infer<typeof disconnectGoogleDriveInput>): Promise<GoogleDriveConfigView> {
  const existing = await db.query.googleDriveConfigTable.findFirst({
    where: eq(googleDriveConfigTable.editionId, editionId),
  });

  if (existing) {
    try {
      const refreshToken = decryptToken(existing.refreshTokenEncrypted);
      await GoogleDriveClient.revokeToken(refreshToken);
    } catch {
      // Continue disconnect even if revoke fails
    }
    await db
      .delete(googleDriveConfigTable)
      .where(eq(googleDriveConfigTable.editionId, editionId));
  }

  return getGoogleDriveConfigView(editionId);
}
