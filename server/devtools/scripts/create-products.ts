import "dotenv/config";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../src/db";
import { budgetLinesTable, productsTable } from "../../src/db/schema";

async function main() {
  const incomeBudgetLines = await db
    .select({
      budgetLineId: budgetLinesTable.id,
      productId: productsTable.id,
      unitPrice: budgetLinesTable.estimatedUnitPrice,
      editionId: budgetLinesTable.editionId,
      name: budgetLinesTable.name,
    })
    .from(budgetLinesTable)
    .where(
      and(eq(budgetLinesTable.lineType, "income"), isNull(productsTable.id)),
    )
    .leftJoin(
      productsTable,
      eq(productsTable.budgetLineId, budgetLinesTable.id),
    );

  if (incomeBudgetLines.length === 0) {
    console.log("No income budget lines to create products for");
    process.exit(0);
  }

  const productsToCreate = incomeBudgetLines.map((incomeBudgetLine) => {
    return {
      name: incomeBudgetLine.name,
      unitPrice: incomeBudgetLine.unitPrice,
      budgetLineId: incomeBudgetLine.budgetLineId,
      editionId: incomeBudgetLine.editionId,
    };
  });

  await db.insert(productsTable).values(productsToCreate);

  console.log(`Created ${productsToCreate.length} products`);

  process.exit(0);
}

main();
