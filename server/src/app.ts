import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { privateRoutesPlugin } from "./routes/private";
import { publicRoutesPlugin } from "./routes/public";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: "http://localhost:5173",
    credentials: true,
  });

  app.register(publicRoutesPlugin);
  app.register(privateRoutesPlugin);

  return app;
}
