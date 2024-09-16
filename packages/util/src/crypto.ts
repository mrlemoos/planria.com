import { createId, isCuid } from "@paralleldrive/cuid2";
import { createHash } from "node:crypto";

export function cuid(): string {
  return createId();
}

// exposes the `isCuid` function from package
export { isCuid };

export function hash(value: string): string {
  return createHash("md5").update(value, "utf-8").digest("hex");
}
