import { field, mutation, query, resolver } from "@gqloom/core";
import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../db/index.js";
import { helloAssoConfigTable } from "../../db/schema/hello-asso-config.js";
import { helloAssoMappingTable } from "../../db/schema/hello-asso-mapping.js";
import {
  addHelloAssoConfig,
  addHelloAssoConfigInput,
} from "./utils/addHelloAssoConfig.js";
import {
  addOrUpdateMapping,
  addOrUpdateMappingInput,
} from "./utils/addOrUpdateMapping.js";
import { loadMapping } from "./utils/loadMapping.js";
import {
  updateHelloAssoConfig,
  updateHelloAssoConfigInput,
} from "./utils/updateHelloAssoConfig.js";

export const helloAssoResolver = resolver.of(helloAssoConfigTable, {
  helloAssoConfig: query(helloAssoConfigTable.$nullable())
    .input(z.object({ editionId: z.number().min(1) }))
    .resolve(async ({ editionId }) =>
      db.query.helloAssoConfigTable.findFirst({
        where: eq(helloAssoConfigTable.editionId, editionId),
      }),
    ),

  mappings: field(helloAssoMappingTable.$list())
    .derivedFrom("id")
    .load(async (configs) => loadMapping(configs.map((config) => config.id))),

  addHelloAssoConfig: mutation(helloAssoConfigTable.$nullable())
    .input(addHelloAssoConfigInput)
    .resolve(addHelloAssoConfig),
  updateHelloAssoConfig: mutation(helloAssoConfigTable.$nullable())
    .input(updateHelloAssoConfigInput)
    .resolve(updateHelloAssoConfig),
});

export const helloAssoMappingResolver = resolver.of(helloAssoMappingTable, {
  addOrUpdateMapping: mutation(helloAssoMappingTable.$nullable())
    .input(addOrUpdateMappingInput)
    .resolve(addOrUpdateMapping),
});
