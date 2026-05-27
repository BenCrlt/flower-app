import { eq } from "drizzle-orm";
import type { FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginAsync } from "fastify";
import { db } from "../../db/index.js";
import { googleDriveConfigTable } from "../../db/schema/google-drive-config.js";
import { GoogleDriveClient, GOOGLE_DRIVE_SCOPES } from "../../modules/google-drive/api/client.js";
import { encryptToken } from "../../modules/google-drive/utils/encryptToken.js";
import {
  createOAuthState,
  verifyOAuthState,
} from "../../modules/google-drive/utils/oauthState.js";
import { auth, fromNodeHeaders } from "../../utils/auth.js";

function getRedirectUri(): string {
  return (
    process.env.GOOGLE_DRIVE_REDIRECT_URI ??
    "http://localhost:3000/api/google-drive/oauth/callback"
  );
}

function buildGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: GOOGLE_DRIVE_SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

async function requireAdminSession(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(request),
  });
  if (!session?.user?.id) {
    reply.status(401).send({ error: "Unauthorized" });
    return null;
  }
  if (session.user.role !== "admin") {
    reply.status(403).send({ error: "Admin required" });
    return null;
  }
  return session;
}

export const googleDriveOAuthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/oauth/start", async (request, reply) => {
    const session = await requireAdminSession(request, reply);
    if (!session) {
      return;
    }

    const editionId = Number(
      (request.query as { editionId?: string }).editionId,
    );
    if (!Number.isFinite(editionId) || editionId <= 0) {
      return reply.status(400).send({ error: "editionId invalide" });
    }

    const state = createOAuthState(editionId, session.user.id);
    return reply.redirect(buildGoogleAuthUrl(state));
  });

  fastify.get("/oauth/callback", async (request, reply) => {
    const { code, state, error } = request.query as {
      code?: string;
      state?: string;
      error?: string;
    };

    const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";
    const redirectWithError = (message: string) =>
      reply.redirect(
        `${frontendUrl}/settings?drive=error&message=${encodeURIComponent(message)}`,
      );

    if (error) {
      return redirectWithError(error);
    }
    if (!code || !state) {
      return redirectWithError("Paramètres OAuth manquants");
    }

    try {
      const payload = verifyOAuthState(state);
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request),
      });
      if (!session?.user?.id || session.user.role !== "admin") {
        return redirectWithError("Session admin requise");
      }
      if (session.user.id !== payload.userId) {
        return redirectWithError("Session invalide pour cette connexion");
      }

      const tokens = await GoogleDriveClient.exchangeCodeForTokens(code);
      const email = await GoogleDriveClient.fetchUserEmail(tokens.accessToken);
      const encrypted = encryptToken(tokens.refreshToken);

      const existing = await db.query.googleDriveConfigTable.findFirst({
        where: eq(googleDriveConfigTable.editionId, payload.editionId),
      });

      if (existing) {
        await db
          .update(googleDriveConfigTable)
          .set({
            refreshTokenEncrypted: encrypted,
            googleAccountEmail: email,
            connectedById: session.user.id,
            connectedAt: new Date(),
          })
          .where(eq(googleDriveConfigTable.editionId, payload.editionId));
      } else {
        await db.insert(googleDriveConfigTable).values({
          editionId: payload.editionId,
          refreshTokenEncrypted: encrypted,
          googleAccountEmail: email,
          connectedById: session.user.id,
        });
      }

      return reply.redirect(`${frontendUrl}/settings?drive=connected`);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur OAuth Google Drive";
      return redirectWithError(message);
    }
  });
};
