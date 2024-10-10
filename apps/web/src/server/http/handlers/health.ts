import { date } from "@planria/util/date";
import { Hono } from "hono";

const health = new Hono();

health.get("/", (c) =>
  c.json({
    status: "ok",
    timestamp: date().toISOString(),
  })
);

export { health };
