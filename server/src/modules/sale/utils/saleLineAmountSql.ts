import { sql } from "drizzle-orm";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import { salesTable } from "../../../db/schema/sales.js";

/** Montant d'une ligne de vente (don = unitPrice saisi, sinon prix catalogue). */
export const saleLineAmountSql = sql<number>`coalesce(${salesTable.unitPrice}, ${budgetLinesTable.estimatedUnitPrice}) * ${salesTable.quantity}`;
