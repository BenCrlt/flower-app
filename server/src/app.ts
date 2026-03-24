import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { privateRoutesPlugin } from "./routes/private/index.js";
import { publicRoutesPlugin } from "./routes/public/index.js";
import { getTrustedFrontendOrigins } from "./utils/frontend-origins.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: getTrustedFrontendOrigins(),
    credentials: true,
  });

  app.register(publicRoutesPlugin);
  app.register(privateRoutesPlugin);

  return app;
}
