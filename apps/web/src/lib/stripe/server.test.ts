import { Stripe as __Stripe } from "stripe";
import {
  expect,
  test,
  vi,
  type MockedClass,
  type MockedFunction,
} from "vitest";

import { env as __env } from "$/server/env";

vi.mock("stripe", () => ({
  Stripe: vi.fn(),
}));
const Stripe = __Stripe as MockedClass<typeof __Stripe>;

vi.mock("$/server/env", () => ({
  env: vi.fn().mockImplementation((value) => value),
}));
const env = __env as MockedFunction<typeof __env>;

vi.mock("$/server/meta", () => ({
  APP_NAME: "APP_NAME",
  APP_URL: "APP_URL",
}));

test("should initialise stripe with STRIPE_SECRET_KEY and appInfo", async function () {
  await import("./server");

  expect(Stripe).toHaveBeenCalledWith(env("STRIPE_SECRET_KEY"), {
    apiVersion: "2024-06-20",
    appInfo: {
      name: "APP_NAME",
      url: "APP_URL",
    },
  });
});
