export function getSaleEffectiveUnitPrice(sale: {
  unitPrice?: string | null;
  budgetLine?: { estimatedUnitPrice?: string } | null;
}): number {
  if (sale.unitPrice != null && sale.unitPrice !== "") {
    return Number(sale.unitPrice);
  }
  return Number(sale.budgetLine?.estimatedUnitPrice ?? 0);
}

export function getSaleLineTotal(sale: {
  quantity: number;
  unitPrice?: string | null;
  budgetLine?: { estimatedUnitPrice?: string } | null;
}): number {
  return sale.quantity * getSaleEffectiveUnitPrice(sale);
}
