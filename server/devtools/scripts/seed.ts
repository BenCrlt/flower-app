import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../../src/db/index.js";
import { editionsTable, user } from "../../src/db/schema/index.js";
import { auth } from "../../src/utils/auth.js";

async function main() {
  const adminUsername = "admin";
  const adminPassword = "123456";

  const admin = await auth.api.createUser({
    body: {
      email: `${adminUsername}@flower2.fr`,
      password: String(adminPassword),
      name: "Benoit Cournault",
      role: "admin",
    },
  });

  await db
    .update(user)
    .set({ username: adminUsername })
    .where(eq(user.id, admin.user.id));

  await db.insert(editionsTable).values({
    name: "FMF 2026",
    startDate: "2026-06-27",
    active: true,
  });

  process.exit(0);
}

main();
