import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { privateRoutesPlugin } from "./routes/private/index.js";
import { publicRoutesPlugin } from "./routes/public/index.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.register(cors, {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  app.register(publicRoutesPlugin);
  app.register(privateRoutesPlugin);

  return app;
}
