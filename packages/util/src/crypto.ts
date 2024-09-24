import { createId, isCuid } from "@paralleldrive/cuid2";
import { hashSync } from "bcryptjs";

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
