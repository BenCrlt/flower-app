import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db/index.js";
import { Vendor, vendorsTable } from "../../../db/schema/index.js";

export const deleteVendorInput = z.object({
  id: z.number().min(1),
});

export const deleteVendor = async ({
  id,
}: z.infer<typeof deleteVendorInput>): Promise<Vendor | null> => {
  return db
    .delete(vendorsTable)
    .where(eq(vendorsTable.id, id))
    .returning()
    .then((result) => result[0] ?? null)
    .catch((error) => {
      throw error;
    });
};
