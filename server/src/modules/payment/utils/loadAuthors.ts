import { db } from "../../../db/index.js";
import { User } from "../../../db/schema/index.js";

export async function loadAuthors(
  authorIds: string[],
): Promise<(User | null)[]> {
  const authors = await db.query.user.findMany({
    where: (table, { inArray }) => inArray(table.id, authorIds),
  });

  const authorsById = new Map(authors.map((author) => [author.id, author]));

  return authorIds.map((id) => authorsById.get(id) || null);
}
