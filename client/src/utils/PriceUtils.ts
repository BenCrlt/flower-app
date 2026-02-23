export const formatPriceToEuros = (amount: number) => {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

  return formatted;
};
