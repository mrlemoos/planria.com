import { randomUUID } from "node:crypto";

/**
 * @deprecated Use `uuid()` from `@planria/util/crypto` instead.
 */
export function uuid(): string {
  return randomUUID();
}
