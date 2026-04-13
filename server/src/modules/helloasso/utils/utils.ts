import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { User, user } from "../../../db/schema/index.js";
import { auth } from "../../../utils/auth.js";

const HELLO_ASSO_USERNAME = "helloasso";

export async function getHelloAssoUser(): Promise<User> {
  const helloAssoUser = await db.query.user.findFirst({
    where: eq(user.username, HELLO_ASSO_USERNAME),
  });

  if (helloAssoUser) {
    return helloAssoUser;
  }

  const newHelloAssoUserResponse = await auth.api.createUser({
    body: {
      email: `${HELLO_ASSO_USERNAME}@flower.fr`,
      password: process.env.HELLO_ASSO_USER_PASSWORD!,
      name: "Hello Asso",
      role: "user",
    },
  });

  await db
    .update(user)
    .set({ username: HELLO_ASSO_USERNAME })
    .where(eq(user.id, newHelloAssoUserResponse.user.id));

  const helloAssoUserCreated = await db.query.user.findFirst({
    where: eq(user.id, HELLO_ASSO_USERNAME),
  });

  if (!helloAssoUserCreated) {
    throw new Error("[HelloAsso] getHelloAssoUser: Failed to create user");
  }

  return helloAssoUserCreated;
}
