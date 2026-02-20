import Fastify from "fastify";
import fs from "fs";
import { lexicographicSortSchema, printSchema } from "graphql";
import mercurius from "mercurius";
import path from "path";
import { schema } from "../../src/schema";

async function main() {
  const app = Fastify();

  app.register(mercurius, {
    schema,
  });

  await app.ready();

  const sdl = printSchema(lexicographicSortSchema(app.graphql.schema));

  fs.writeFileSync(path.resolve("./generated/schema.gql"), sdl);

  console.log("✅ schema.graphql généré");
  await app.close();
}

main();
