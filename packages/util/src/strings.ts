import { ADJECTIVES, NOUNS } from "./constants";

export function containsDigit(value: string): boolean {
  return /\d/.test(value);
}

export function containsUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

export function containsLowercase(value: string): boolean {
  return /[a-z]/.test(value);
}

export function containsSpecialCharacter(value: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}

export type SuppressSuffix<
  T extends string,
  S extends string
> = T extends `${infer U}${S}` ? U : T;

export function removeSuffix<T extends string, S extends string>(
  value: T,
  suffix: S
): SuppressSuffix<T, S> {
  if (value.endsWith(suffix)) {
    return value.slice(0, -suffix.length) as SuppressSuffix<T, S>;
  }

  return value as SuppressSuffix<T, S>;
}

export function getInitials(...lines: string[]): string {
  return lines
    .map((line) => line[0]?.trim() ?? "")
    .filter(Boolean)
    .join("")
    .trim();
}

export function trimAll<T extends string>(strings: T[]): T[] {
  return strings.map((str) => str.trim()) as T[];
}

export function formatCurrency(
  value: number,
  {
    locale = "en-US",
    decimalPlaces = 2,
    currency = "USD",
  }: {
    locale?: string;
    decimalPlaces?: number;
    currency: "USD" | "EUR" | "GBP";
  } = {
    currency: "USD",
  }
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

export function randomString(radix = 36) {
  // The slice removes the `0.` from the start of the string
  return Math.random().toString(radix).slice(2);
}

export function coerceString(...values: unknown[]): string {
  return values.filter((value) => typeof value === "string").join(" ");
}

export type CSSClassSelector<T extends string> = `.${T}`;

export type CSSIdentifierSelector<T extends string> = `#${T}`;

export type CSSSelector<T extends string> =
  | CSSClassSelector<T>
  | CSSIdentifierSelector<T>;

export function randomNoun() {
  return NOUNS[Math.floor(Math.random() * NOUNS.length)];
}

export function randomAdjective() {
  return ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
}

export function capitalize(value: string): string {
  return value[0].toUpperCase() + value.slice(1);
}
