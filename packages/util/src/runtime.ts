export function isClient(
  _window = window
): _window is Window & typeof globalThis {
  return typeof window !== "undefined";
}

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
