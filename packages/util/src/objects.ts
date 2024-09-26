/**
 * Type guard for checking if a value whether the given value is an object.
 */
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

export function copyFormData(formData: FormData): FormData {
  const copy = new FormData();

  formData.forEach((value, key) => {
    copy.set(key, value);
  });

  return copy;
}
