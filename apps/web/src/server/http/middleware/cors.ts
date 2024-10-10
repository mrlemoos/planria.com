import { cors as honoCors } from "hono/cors";

export function cors() {
  return honoCors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    maxAge: 86400, // 24 hours
  });
}
