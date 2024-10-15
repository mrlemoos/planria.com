import { createId, isCuid } from "@paralleldrive/cuid2";
import { compareSync, hashSync } from "bcrypt-edge";

export function cuid(): string {
  return createId();
}

// exposes the `isCuid` function from package
export { isCuid };

/**
 * Hashes a string using `bcrypt` with the specified number of salt rounds.
 */
export function hash(value: string, saltRounds = 10): string {
  return hashSync(value, saltRounds);
}

/**
 * Compares a raw string value with a hashed value to determine if they match.
 */
export function compareHash(value: string, hash: string): boolean {
  return compareSync(value, hash);
}

/**
 * Generates and returns a UUID v4 string.
 */
export function uuid(): string {
  return crypto.randomUUID();
}
