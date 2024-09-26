export function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * @deprecated Use {@link getComputedBaseURL | `getComputedBaseURL()`} instead.
 */
export function getBaseURL(): string {
  if (isClient()) {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

/**
 * Returns the base URL for the current environment.
 */
export function getComputedBaseURL(): string {
  if (isClient()) {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
