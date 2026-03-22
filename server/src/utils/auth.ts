import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: ["http://localhost:3000", "http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 6,
    maxPasswordLength: 6,
  },
  plugins: [username(), admin()],
});
