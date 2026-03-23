import { FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { registerAuthorizationHook } from "../../middleware/authorization.js";
import { schema } from "../../schema.js";
import { filesRoutes } from "./file.js";

export const privateRoutesPlugin: FastifyPluginAsync = async (fastify) => {
  registerAuthorizationHook(fastify);

  await fastify.register(filesRoutes, { prefix: "/files" });
  await fastify.register(mercurius, {
    schema,
    graphiql: true,
  });
};
