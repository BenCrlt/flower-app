import _ from "lodash";
import { HelloAssoMapping } from "../../../db/schema/hello-asso-mapping.js";
import { db } from "../../../index.js";

export async function loadMapping(
  configIds: number[],
): Promise<HelloAssoMapping[][]> {
  const mappingsFromConfigs = await db.query.helloAssoMappingTable.findMany({
    where: (table, { inArray }) => inArray(table.configId, configIds),
  });

  const mappingsById = _.groupBy(mappingsFromConfigs, "configId");

  return configIds.map((id) => mappingsById[id] ?? []);
}
