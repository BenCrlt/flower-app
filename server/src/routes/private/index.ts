import { FastifyPluginAsync } from "fastify";
import { GraphQLError } from "graphql";
import mercurius from "mercurius";
import { AppGraphQLContext } from "../../modules/graphql/context.js";
import { registerAuthorizationHook } from "../../middleware/authorization.js";
import { schema } from "../../schema.js";
import { filesRoutes } from "./file.js";

export const privateRoutesPlugin: FastifyPluginAsync = async (fastify) => {
  registerAuthorizationHook(fastify);

  await fastify.register(filesRoutes, { prefix: "/files" });
  await fastify.register(mercurius, {
    schema,
    graphiql: true,
    context: (request): AppGraphQLContext => {
      const authSession = request.authSession ?? null;
      if (!authSession?.user?.id) {
        throw new GraphQLError("Authentication required", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return { authSession };
    },
  });
};
