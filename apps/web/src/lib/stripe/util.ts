/**
 * Formats and returns the given amount for Stripe payment processing.
 * @param amount The amount to be formatted.
 * @param currency The currency in which the amount is specified.
 * @returns The formatted amount.
 */
export function formatAmountForStripe(
  // See the original implementation from the Next.js example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/utils/stripe-helpers.ts
  amount: number,
  currency: "USD" | (string & {})
): number {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export function isStripeError(error: unknown): error is {
  statusCode: number;
  message?: string;
} {
  return (
    typeof error === "object" &&
    !!error &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  );
}
