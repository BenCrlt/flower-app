import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import {
  GoogleDriveConfig,
  googleDriveConfigTable,
} from "../../../db/schema/google-drive-config.js";
import { GoogleDriveClient } from "../api/client.js";

export async function getGoogleDriveConfigForEdition(
  editionId: number,
): Promise<GoogleDriveConfig | null> {
  return (
    (await db.query.googleDriveConfigTable.findFirst({
      where: eq(googleDriveConfigTable.editionId, editionId),
    })) ?? null
  );
}

export function isDriveConfigured(
  config: GoogleDriveConfig | null,
): config is GoogleDriveConfig & { invoiceFolderId: string } {
  return Boolean(config?.refreshTokenEncrypted && config.invoiceFolderId);
}

export function createDriveClientFromConfig(
  config: GoogleDriveConfig,
): GoogleDriveClient {
  return GoogleDriveClient.fromEncryptedRefreshToken(
    config.refreshTokenEncrypted,
  );
}
