import { eq, inArray } from "drizzle-orm";
import _ from "lodash";
import z from "zod";
import { db } from "../../../db";
import {
  Invoice,
  invoicesTable,
  invoiceStatusSchema,
  paymentsTable,
} from "../../../db/schema";

const updatePaymentInput = z.object({
  id: z.number().min(1).optional(),
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  budgetLineId: z.number().min(1),
});

export const updateInvoiceInput = z.object({
  id: z.number().min(1),
  editionId: z.number().min(1),
  name: z.string().min(1).max(255).optional(),
  vendorId: z.number().min(1).optional(),
  totalAmount: z.number().min(0).optional(),
  note: z.string().min(1).max(255).optional(),
  authorId: z.string().uuid().optional(),
  status: invoiceStatusSchema.optional(),
  payments: z.array(updatePaymentInput).optional(),
});

export async function updateInvoice({
  id,
  payments,
  totalAmount,
  ...input
}: z.infer<typeof updateInvoiceInput>): Promise<Invoice | null> {
  const invoiceBeforeUpdate = await db.query.invoicesTable.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!invoiceBeforeUpdate) {
    throw new Error("Invoice not found");
  }

  const [invoiceUpdated] = await db
    .update(invoicesTable)
    .set({
      ...input,
      totalAmount: totalAmount ? totalAmount.toString() : undefined,
      executedAt:
        invoiceBeforeUpdate.status !== input.status && input.status === "PAID"
          ? new Date()
          : undefined,
    })
    .where(eq(invoicesTable.id, id))
    .returning();

  if (!payments?.length || !invoiceUpdated) {
    return invoiceUpdated || null;
  }
  const existingPaymentIds = _.compact(_.map(payments, "id"));

  if (existingPaymentIds.length > 0) {
    await db
      .delete(paymentsTable)
      .where(inArray(paymentsTable.id, existingPaymentIds));
  }

  if (invoiceUpdated.status === "PAID") {
    await db.insert(paymentsTable).values(
      payments.map((payment) => ({
        invoiceId: id,
        quantity: payment.quantity,
        unitPrice: payment.unitPrice.toString(),
        budgetLineId: payment.budgetLineId,
        editionId: input.editionId,
      })),
    );
  }

  return invoiceUpdated;
}
