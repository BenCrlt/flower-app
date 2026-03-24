import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import "dotenv/config";
import { FastifyRequest } from "fastify";
import { db } from "../db/index.js";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://127.0.0.1:3000",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 6,
    maxPasswordLength: 6,
  },
  plugins: [username(), admin()],
});

export function fromNodeHeaders(request: FastifyRequest): Headers {
  const headers = new Headers();
  Object.entries(request.headers).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString());
  });
  return headers;
}
