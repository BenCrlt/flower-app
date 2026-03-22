import { FastifyPluginAsync } from "fastify";
import { authRoutes } from "./auth";

/** Routes sans vérification d’autorisation (Better Auth gère la session). */
export const publicRoutesPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authRoutes, { prefix: "/api/auth" });
};
