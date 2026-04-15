import { db } from "../../../db/index.js";
import { User } from "../../../db/schema/index.js";

export async function loadAuthors(
  authorIds: (string | null)[],
): Promise<(User | null)[]> {
  const existingAuthorIds = authorIds.filter((id): id is string => Boolean(id));

  if (!existingAuthorIds.length) {
    return authorIds.map(() => null);
  }

  const authors = await db.query.user.findMany({
    where: (table, { inArray }) => inArray(table.id, existingAuthorIds),
  });

  const authorsById = new Map(authors.map((author) => [author.id, author]));

  return authorIds.map((id) => (id ? authorsById.get(id) || null : null));
}
