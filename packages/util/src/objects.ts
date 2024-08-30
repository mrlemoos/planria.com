export function isObject<T extends object>(value: unknown): value is T {
  return typeof value === "object" && value !== null;
}

/**
 * Tries to parse a FormData object into a generic type T.
 * @param formData The FormData object to parse.
 * @returns The parsed object of type T, or null if parsing fails.
 */
export function tryParseFormData<T>(formData: FormData): T | null {
  try {
    return Object.fromEntries(formData.entries()) as T;
  } catch (error) {
    return null;
  }
}
