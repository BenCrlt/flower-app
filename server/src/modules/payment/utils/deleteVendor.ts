import { eq } from "drizzle-orm";
import z from "zod";
import { db } from "../../../db";
import { Vendor, vendorsTable } from "../../../db/schema";

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
