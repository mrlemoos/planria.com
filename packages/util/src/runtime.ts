export function isClient(
  _window = window
): _window is Window & typeof globalThis {
  return typeof window !== "undefined";
}
