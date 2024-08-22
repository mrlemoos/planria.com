import { createId, isCuid } from "@paralleldrive/cuid2";
import bcrypt from "bcrypt";

export function cuid(): string {
  return createId();
}

// exposes the `isCuid` function from package
export { isCuid };

// typically between 10 and 12
const DEFAULT_SALT_ROUNDS = 10 as const;

/**
 * Hashes a given value using bcrypt algorithm.
 * @param value - The value to be hashed.
 * @param saltRounds - The number of salt rounds to use for hashing. Defaults to `DEFAULT_SALT_ROUNDS`.
 * @returns The hashed value.
 */
export function hash(value: string, saltRounds: number = DEFAULT_SALT_ROUNDS) {
  return bcrypt.hashSync(value, saltRounds);
}

/**
 * Compares a value with an encrypted hash and returns true if they match.
 * @param value - The value to compare.
 * @param hash - The hash to compare against.
 * @returns `true` if the value matches the hash, `false` otherwise.
 */
export function compareHash(value: string, hash: string): boolean {
  return bcrypt.compareSync(value, hash);
}
