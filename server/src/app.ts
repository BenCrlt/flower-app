import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { privateRoutesPlugin } from "./routes/private/index.js";
import { publicRoutesPlugin } from "./routes/public/index.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });
  const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

  app.register(cors, {
    origin: frontendUrl,
    credentials: true,
  });

  app.register(publicRoutesPlugin);
  app.register(privateRoutesPlugin);

  return app;
}
