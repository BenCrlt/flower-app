import { BudgetLine } from "../../../db/schema/budget-lines.js";

export function assertFreePriceAllowedForLineType(
  lineType: BudgetLine["lineType"],
  isFreePrice: boolean,
): void {
  if (isFreePrice && lineType !== "income") {
    throw new Error(
      "Le prix libre est uniquement autorisé pour les lignes de type recette.",
    );
  }
}

export async function assertFreePriceCanChange(
  budgetLineId: number,
  currentIsFreePrice: boolean,
  nextIsFreePrice: boolean,
  salesCount: number | null,
): Promise<void> {
  if (currentIsFreePrice === nextIsFreePrice) {
    return;
  }

  if ((salesCount ?? 0) > 0) {
    throw new Error(
      "Impossible de modifier le prix libre : cette ligne a déjà des ventes.",
    );
  }
}
