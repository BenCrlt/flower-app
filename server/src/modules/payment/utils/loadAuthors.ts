import { db } from "../../../db";
import { User } from "../../../db/schema";

export async function loadAuthors(
  authorIds: number[],
): Promise<(User | null)[]> {
  const authors = await db.query.usersTable.findMany({
    where: (table, { inArray }) => inArray(table.id, authorIds),
  });

  const authorsById = new Map(authors.map((author) => [author.id, author]));

  return authorIds.map((id) => authorsById.get(id) || null);
}
