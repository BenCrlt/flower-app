import "dotenv/config";
import { buildApp } from "./app";
export * from "./db/index";

const app = buildApp();

app.listen({ port: 3000 });
