import { decryptToken } from "../utils/encryptToken.js";

const DRIVE_API = "https://www.googleapis.com/drive/v3";
const UPLOAD_API = "https://www.googleapis.com/upload/drive/v3";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const REVOKE_URL = "https://oauth2.googleapis.com/revoke";

export const GOOGLE_DRIVE_SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/userinfo.email",
];

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface OAuthErrorResponse {
  error?: string;
  error_description?: string;
}

export class GoogleDriveReauthRequiredError extends Error {
  constructor() {
    super(
      "Connexion Google Drive expirée. Reconnectez Google Drive dans les paramètres.",
    );
    this.name = "GoogleDriveReauthRequiredError";
  }
}

export function isGoogleDriveReauthRequiredError(
  error: unknown,
): error is GoogleDriveReauthRequiredError {
  return error instanceof GoogleDriveReauthRequiredError;
}

export class GoogleDriveClient {
  private accessToken: string | null = null;

  constructor(private readonly refreshToken: string) {}

  static fromEncryptedRefreshToken(encrypted: string): GoogleDriveClient {
    return new GoogleDriveClient(decryptToken(encrypted));
  }

  private async refreshAccessToken(): Promise<string> {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: this.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const raw = (await res.json()) as TokenResponse & OAuthErrorResponse;
    if (!res.ok) {
      if (raw.error === "invalid_grant") {
        throw new GoogleDriveReauthRequiredError();
      }
      throw new Error(
        raw.error_description ??
          raw.error ??
          `Google OAuth refresh failed (${res.status})`,
      );
    }
    this.accessToken = raw.access_token;
    return raw.access_token;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }
    return this.refreshAccessToken();
  }

  private async driveFetch(
    path: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const token = await this.getAccessToken();
    const res = await fetch(`${DRIVE_API}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (res.status === 401) {
      this.accessToken = null;
      const retryToken = await this.refreshAccessToken();
      return fetch(`${DRIVE_API}${path}`, {
        ...options,
        headers: {
          Authorization: `Bearer ${retryToken}`,
          ...options.headers,
        },
      });
    }
    return res;
  }

  async findFolderInParent(
    parentId: string,
    folderName: string,
  ): Promise<string | null> {
    const q = [
      `'${parentId}' in parents`,
      `name = '${folderName.replace(/'/g, "\\'")}'`,
      "mimeType = 'application/vnd.google-apps.folder'",
      "trashed = false",
    ].join(" and ");
    const res = await this.driveFetch(
      `/files?${new URLSearchParams({
        q,
        fields: "files(id)",
        pageSize: "1",
      })}`,
    );
    if (!res.ok) {
      throw new Error(`Drive list folders failed (${res.status})`);
    }
    const data = (await res.json()) as { files: DriveFile[] };
    return data.files[0]?.id ?? null;
  }

  async createFolder(name: string, parentId: string): Promise<string> {
    const res = await this.driveFetch("/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentId],
      }),
    });
    if (!res.ok) {
      throw new Error(`Drive create folder failed (${res.status})`);
    }
    const data = (await res.json()) as DriveFile;
    return data.id;
  }

  async ensureFolder(name: string, parentId: string): Promise<string> {
    const existing = await this.findFolderInParent(parentId, name);
    if (existing) {
      return existing;
    }
    return this.createFolder(name, parentId);
  }

  async uploadFile(
    parentId: string,
    fileName: string,
    mimeType: string,
    buffer: Buffer,
  ): Promise<DriveFile> {
    const metadata = JSON.stringify({
      name: fileName,
      parents: [parentId],
    });
    const boundary = `flower_${Date.now()}`;
    const body = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`,
      ),
      buffer,
      Buffer.from(`\r\n--${boundary}--`),
    ]);
    const token = await this.getAccessToken();
    const res = await fetch(
      `${UPLOAD_API}/files?uploadType=multipart&fields=id,name,mimeType`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body,
      },
    );
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Drive upload failed (${res.status}): ${errText}`);
    }
    return (await res.json()) as DriveFile;
  }

  async deleteFile(fileId: string): Promise<void> {
    const res = await this.driveFetch(`/files/${fileId}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404) {
      throw new Error(`Drive delete failed (${res.status})`);
    }
  }

  async downloadFile(fileId: string): Promise<{
    buffer: Buffer;
    mimeType: string;
    fileName: string;
  }> {
    const metaRes = await this.driveFetch(
      `/files/${fileId}?${new URLSearchParams({ fields: "name,mimeType" })}`,
    );
    if (!metaRes.ok) {
      throw new Error(`Drive metadata failed (${metaRes.status})`);
    }
    const meta = (await metaRes.json()) as DriveFile;
    const token = await this.getAccessToken();
    const contentRes = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!contentRes.ok) {
      throw new Error(`Drive download failed (${contentRes.status})`);
    }
    const arrayBuffer = await contentRes.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      mimeType: meta.mimeType,
      fileName: meta.name,
    };
  }

  static async exchangeCodeForTokens(code: string): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_DRIVE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    });
    const raw = (await res.json()) as {
      refresh_token?: string;
      access_token: string;
      error?: string;
    };
    if (!res.ok || !raw.refresh_token) {
      throw new Error(
        raw.error ??
          "Google OAuth: refresh_token manquant (utilisez prompt=consent)",
      );
    }
    return {
      refreshToken: raw.refresh_token,
      accessToken: raw.access_token,
    };
  }

  static async fetchUserEmail(accessToken: string): Promise<string> {
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      throw new Error(`Google userinfo failed (${res.status})`);
    }
    const data = (await res.json()) as { email?: string };
    return data.email ?? "unknown";
  }

  static async revokeToken(refreshToken: string): Promise<void> {
    await fetch(REVOKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ token: refreshToken }),
    });
  }
}
