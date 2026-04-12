import { mutation, query, resolver } from "@gqloom/core";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { helloAssoConfigTable } from "../../../db/schema/hello-asso-config.js";
import {
  addHelloAssoConfig,
  addHelloAssoConfigInput,
} from "./addHelloAssoConfig.js";
import {
  updateHelloAssoConfig,
  updateHelloAssoConfigInput,
} from "./updateHelloAssoConfig.js";

export const helloAssoResolver = resolver.of(helloAssoConfigTable, {
  helloAssoConfig: query(helloAssoConfigTable.$nullable())
    .input(z.object({ editionId: z.number().min(1) }))
    .resolve(async ({ editionId }) =>
      db.query.helloAssoConfigTable.findFirst({
        where: eq(helloAssoConfigTable.editionId, editionId),
      }),
    ),

  addHelloAssoConfig: mutation(helloAssoConfigTable.$nullable())
    .input(addHelloAssoConfigInput)
    .resolve(addHelloAssoConfig),
  updateHelloAssoConfig: mutation(helloAssoConfigTable.$nullable())
    .input(updateHelloAssoConfigInput)
    .resolve(updateHelloAssoConfig),
});
