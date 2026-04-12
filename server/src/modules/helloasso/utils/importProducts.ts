import { db } from "../../../db/index.js";
import { budgetLinesTable } from "../../../db/schema/budget-lines.js";
import { HelloAssoConfig } from "../../../db/schema/hello-asso-config.js";
import { HelloAssoApi } from "../api/index.js";

export async function importProducts(
  config: HelloAssoConfig,
  budgetCategoryId: number,
): Promise<void> {
  const helloAssoApi = new HelloAssoApi();
  const formInfo = await helloAssoApi.getFormInfo(config.formSlug);

  const budgetLinesToCreate =
    formInfo.tiers?.map((tier) => ({
      name: tier.label ?? "",
      description: tier.description,
      lineType: "income" as const,
      editionId: config.editionId,
      budgetCategoryId,
      estimatedQuantity: 1,
      estimatedUnitPrice: ((tier.price ?? 0) / 100).toFixed(2),
    })) ?? [];

  if (budgetLinesToCreate.length > 0) {
    await db.insert(budgetLinesTable).values(budgetLinesToCreate);
  }
}
