import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { Vendor, vendorsTable } from "../../../db/schema/index.js";

export const addOrUpdateVendorInput = z.object({
  id: z.number().min(1).optional(),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255).optional(),
  phone: z.string().min(1).max(255).optional(),
  address: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
});

export function addOrUpdateVendor({
  id,
  ...input
}: z.infer<typeof addOrUpdateVendorInput>): Promise<Vendor | null> {
  if (id) {
    return db
      .update(vendorsTable)
      .set(input)
      .where(eq(vendorsTable.id, id))
      .returning()
      .then((result) => result[0] || null);
  }
  return db
    .insert(vendorsTable)
    .values(input)
    .returning()
    .then((result) => result[0] || null);
}
