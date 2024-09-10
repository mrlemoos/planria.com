export const SUPPORTED_CURRENCIES = ["usd", "eur", "gbp", "brl"] as const;

export const SUPPORTED_CURRENCY_SYMBOLS = {
  usd: "$",
  eur: "€",
  gbp: "£",
  brl: "R$",
} as const;

export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export type SupportedCurrencySymbol =
  (typeof SUPPORTED_CURRENCY_SYMBOLS)[SupportedCurrency];

/**
 * Converts a currency amount to a decimal value.
 */
export function convertToCurrencyDecimal(amount: number, factor = 100) {
  return Math.round(amount * factor);
}
