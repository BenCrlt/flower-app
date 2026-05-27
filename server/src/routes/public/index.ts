import { FastifyPluginAsync } from "fastify";
import { authRoutes } from "./auth.js";
import { googleDriveOAuthRoutes } from "./google-drive-oauth.js";

/** Routes sans vérification d’autorisation (Better Auth gère la session). */
export const publicRoutesPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authRoutes, { prefix: "/api/auth" });
  await fastify.register(googleDriveOAuthRoutes, {
    prefix: "/api/google-drive",
  });
};
