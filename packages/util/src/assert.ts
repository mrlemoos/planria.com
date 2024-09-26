import { isNonNullable } from "./primitives";

export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

/**
 * Asserts the given condition is true or throws an error with the provided message
 * given that the condition is false.
 */
export function assert<U, E>(
  condition: U,
  error: E
): asserts condition is U & {} {
  if (!condition) {
    if (typeof error === "string") {
      throw new AssertionError(error);
    } else if (error instanceof Error || isNonNullable(error)) {
      throw error;
    } else if (typeof error === "function") {
      throw error();
    } else {
      throw new AssertionError("Assertion failed");
    }
  }
}
