import { createId, isCuid } from "@paralleldrive/cuid2";

export function cuid(): string {
  return createId();
}

// exposes the `isCuid` function from package
export { isCuid };
