import { expect, test } from "vitest";

import { convertToCurrencyDecimal } from "./currency";

test("convertToCurrencyDecimal() converts a currency amount to a decimal value", function () {
  const amount = 100;

  const result = convertToCurrencyDecimal(amount);

  expect(result).toBe(10000);
});

test("convertToCurrencyDecimal() converts a currency amount to a decimal value with a custom factor", function () {
  const amount = 100;
  const factor = 10;

  const result = convertToCurrencyDecimal(amount, factor);

  expect(result).toBe(1000);
});
