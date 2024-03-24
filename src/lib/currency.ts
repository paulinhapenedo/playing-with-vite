export function formatPriceToCurrency(value: number, locale?: string) {
  // in the future we could have a way for the user to choose the currency
  // and use a library like Dinero.js
  const userLocale = locale ?? "US";
  const mapLocaleToCurrency: Record<string, string> = {
    US: "USD",
  };

  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: mapLocaleToCurrency[userLocale],
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
  }).format(value);
}
