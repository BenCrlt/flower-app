import z from "zod";
import { db } from "../../../db";
import {
  Invoice,
  invoicesTable,
  invoiceStatusSchema,
  paymentsTable,
} from "../../../db/schema";

const addPaymentInput = z.object({
  quantity: z.number().min(1),
  unitPrice: z.number().min(0),
  budgetLineId: z.number().min(1),
});

export const addInvoiceInput = z.object({
  editionId: z.number().min(1),
  name: z.string().min(1).max(255),
  vendorId: z.number().min(1),
  totalAmount: z.number().min(0),
  note: z.string().min(1).max(255).optional(),
  authorId: z.string().uuid(),
  status: invoiceStatusSchema,
  payments: z.array(addPaymentInput).min(1),
});

export async function addInvoice({
  payments,
  totalAmount,
  ...input
}: z.infer<typeof addInvoiceInput>): Promise<Invoice | null> {
  const [invoice] = await db
    .insert(invoicesTable)
    .values({
      ...input,
      totalAmount: totalAmount.toString(),
      executedAt: input.status === "PAID" ? new Date() : undefined,
    })
    .returning();

  if (!invoice) {
    return null;
  }

  if (invoice.status === "PAID") {
    await db.insert(paymentsTable).values(
      payments.map((payment) => ({
        invoiceId: invoice.id,
        quantity: payment.quantity,
        unitPrice: payment.unitPrice.toString(),
        budgetLineId: payment.budgetLineId,
        editionId: input.editionId,
      })),
    );
  }

  return invoice;
}
