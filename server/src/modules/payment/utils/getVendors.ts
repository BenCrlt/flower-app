import { db } from "../../../db/index.js";
import { Vendor } from "../../../db/schema/index.js";

export function getVendors(): Promise<Vendor[]> {
  return db.query.vendorsTable.findMany();
}
