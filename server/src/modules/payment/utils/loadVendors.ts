import { db } from "../../../db";
import { Vendor } from "../../../db/schema";

export async function loadVendors(
  vendorIds: number[],
): Promise<(Vendor | null)[]> {
  const vendors = await db.query.vendorsTable.findMany({
    where: (table, { inArray }) => inArray(table.id, vendorIds),
  });

  const vendorById = new Map(vendors.map((vendor) => [vendor.id, vendor]));

  return vendorIds.map((id) => vendorById.get(id) || null);
}
