import type { Context, MiddlewareHandler, Next } from "hono";

export function chronometer(): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    c.res.headers.set("X-Response-Time", `${end - start}`);
  };
}
