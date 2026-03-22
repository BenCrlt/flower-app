import { FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { registerAuthorizationHook } from "../../middleware/authorization";
import { schema } from "../../schema";
import { filesRoutes } from "./file";

export const privateRoutesPlugin: FastifyPluginAsync = async (fastify) => {
  registerAuthorizationHook(fastify);

  await fastify.register(filesRoutes, { prefix: "/files" });
  await fastify.register(mercurius, {
    schema,
    graphiql: true,
  });
};
