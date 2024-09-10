/**
 * Enum for HTTP protocol.
 */
export enum HttpProtocol {
  HTTPS = "https",
  HTTP = "http",
}

/**
 * Computes the HTTP protocol based on the environment and returns the enum value.
 */
export function getComputedHttpProtocol() {
  return process.env.NODE_ENV === "development"
    ? HttpProtocol.HTTP
    : HttpProtocol.HTTPS;
}
