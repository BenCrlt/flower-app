import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./schema/relations.js";
import * as schema from "./schema/index.js";

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: "snake_case",
  schema,
  relations,
});
