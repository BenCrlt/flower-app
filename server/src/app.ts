import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import mercurius from "mercurius";
import { filesRoutes } from "./routes/file";
import { schema } from "./schema";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.register(filesRoutes, { prefix: "/files" });

  app.register(cors, {
    origin: "http://localhost:5173",
  });

  app.register(mercurius, {
    schema,
    graphiql: true,
  });

  return app;
}
