import "dotenv/config";
import { buildApp } from "./app.js";

const app = buildApp();
const port = Number.parseInt(process.env.PORT ?? "", 10) || 3000;

app.listen({ port });
