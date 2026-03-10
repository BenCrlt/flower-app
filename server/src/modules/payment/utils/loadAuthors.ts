import { db } from "../../../db";
import { User } from "../../../db/schema";

export async function loadAuthors(
  authorIds: string[],
): Promise<(User | null)[]> {
  const authors = await db.query.user.findMany({
    where: (table, { inArray }) => inArray(table.id, authorIds),
  });

  const authorsById = new Map(authors.map((author) => [author.id, author]));

  return authorIds.map((id) => authorsById.get(id) || null);
}
