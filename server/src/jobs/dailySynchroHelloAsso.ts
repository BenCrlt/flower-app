import { addDays, formatDate } from "date-fns";
import { eq } from "drizzle-orm";
import { editionsTable, helloAssoConfigTable } from "../db/schema/index.js";
import { db } from "../index.js";
import { synchroOrders } from "../modules/helloasso/utils/synchroOrders.js";

export async function dailySynchroHelloAsso(): Promise<void> {
  const now = new Date();
  const from = formatDate(now, "yyyy-MM-dd");
  const to = formatDate(addDays(now, 1), "yyyy-MM-dd");

  const [activeConfig] = await db
    .select({ id: helloAssoConfigTable.id })
    .from(helloAssoConfigTable)
    .innerJoin(
      editionsTable,
      eq(helloAssoConfigTable.editionId, editionsTable.id),
    )
    .where(eq(editionsTable.active, true))
    .limit(1);

  if (!activeConfig) {
    console.info("[DailySynchroHelloAsso]: No active HelloAsso config found");
    return;
  }

  console.info(`[DailySynchroHelloAsso]: Synchro orders from ${from} to ${to}`);
  await synchroOrders({ helloAssoConfigId: activeConfig.id, from, to });
}
