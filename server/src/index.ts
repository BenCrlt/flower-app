import Fastify from "fastify";
import mercurius from "mercurius";

const app = Fastify({
  logger: true,
});

const schema = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

app.get("/", async function (req, reply) {
  const query = "{ hello }";
  return reply.graphql(query);
});

app.listen({ port: 3000 });
