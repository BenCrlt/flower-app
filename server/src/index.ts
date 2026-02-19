import "dotenv/config";
import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema";
export * from "./db/index";

const app = Fastify({
  logger: true,
});

app.register(mercurius, {
  schema,
  graphiql: true,
});

app.get("/", async function (req, reply) {
  const query = "{ editions { total data { id name } } }";
  return reply.graphql(query);
});

app.listen({ port: 3000 });
