import type { FastifyInstance } from "fastify";
import { auth, fromNodeHeaders } from "../utils/auth.js";

export function registerAuthorizationHook(app: FastifyInstance): void {
  app.addHook("onRequest", async (request, reply) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request),
    });
    if (!session) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  });
}
