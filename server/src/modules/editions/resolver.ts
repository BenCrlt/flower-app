import { query, resolver } from "@gqloom/core";
import { count } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../db/index";
import { editionsTable } from "../../db/schema/editions";
import { paginatedOutput } from "../../db/types";

const editionSchema = z.object({
  id: z.number(),
  name: z.string(),
  startDate: z.string(),
});

export const editionsResolver = resolver.of(editionsTable, {
  editions: query
    .output(paginatedOutput(editionSchema))
    // .input(paginatedInput)
    .resolve(async () => {
      // const offset = (page - 1) * limit;
      const offset = 0;
      const limit = 10;
      const data = await db.query.editionsTable.findMany({ limit, offset });
      const result = await db.select({ count: count() }).from(editionsTable);
      const total = result[0]?.count ?? 0;
      return { data, total };
    }),
});
