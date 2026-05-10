export const formatPriceToEuros = (amount: number) => {
  const n = Number(amount);
  const safe = Number.isFinite(n) ? n : 0;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(safe);
};
