import { eq } from "drizzle-orm";
import { db } from "../../src";
import { editionsTable, user } from "../../src/db/schema";
import { auth } from "../../src/utils/auth";

async function main() {
  const adminUsername = "admin";
  const adminPassword = "123456";

  const admin = await auth.api.createUser({
    body: {
      email: `${adminUsername}@flower2.fr`, // required
      password: `${adminPassword}`, // required
      name: "Benoit Cournault", // required
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
