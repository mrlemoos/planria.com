export class AssertionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function assert<U, E>(
  condition: U,
  error: E
): asserts condition is U & {} {
  if (!condition) {
    if (typeof error === "string") {
      throw new AssertionError(error);
    } else {
      throw error;
    }
  }
}
