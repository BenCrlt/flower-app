import { createHmac, timingSafeEqual } from "crypto";

const STATE_TTL_MS = 10 * 60 * 1000;

function getStateSecret(): string {
  const secret = process.env.GOOGLE_DRIVE_TOKEN_ENCRYPTION_KEY;
  if (!secret) {
    throw new Error("GOOGLE_DRIVE_TOKEN_ENCRYPTION_KEY is not set");
  }
  return secret;
}

export interface OAuthStatePayload {
  editionId: number;
  userId: string;
  exp: number;
}

export function signOAuthState(payload: OAuthStatePayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getStateSecret())
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verifyOAuthState(state: string): OAuthStatePayload {
  const [data, signature] = state.split(".");
  if (!data || !signature) {
    throw new Error("Invalid OAuth state");
  }
  const expected = createHmac("sha256", getStateSecret())
    .update(data)
    .digest("base64url");
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (
    sigBuf.length !== expectedBuf.length ||
    !timingSafeEqual(sigBuf, expectedBuf)
  ) {
    throw new Error("Invalid OAuth state signature");
  }
  const payload = JSON.parse(
    Buffer.from(data, "base64url").toString("utf8"),
  ) as OAuthStatePayload;
  if (payload.exp < Date.now()) {
    throw new Error("OAuth state expired");
  }
  return payload;
}

export function createOAuthState(
  editionId: number,
  userId: string,
): string {
  return signOAuthState({
    editionId,
    userId,
    exp: Date.now() + STATE_TTL_MS,
  });
}
