/**
 * Checks whether a value is `null` or `undefined`.
 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
