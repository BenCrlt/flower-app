import { db } from "../../../db";
import { Vendor } from "../../../db/schema";

export function getVendors(): Promise<Vendor[]> {
  return db.query.vendorsTable.findMany();
}
