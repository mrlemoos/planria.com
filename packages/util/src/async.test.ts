import { expect, test } from "vitest";

import { TimeoutError, delay, timeout } from "./async";

test("delay() should resolve after the specified time", async function () {
  const start = Date.now();

  await delay(100);

  const end = Date.now();
  expect(end - start).toBeGreaterThanOrEqual(100);
});

test("timeout() should resolve a result before the timeout", async function () {
  const ms = 100;
  const result = await timeout(ms, delay(50));

  expect(result).toBeUndefined();
});

test("timeout() should reject with a TimeoutError after the timeout", async function () {
  const ms = 100;
  try {
    await timeout(ms, delay(200));
  } catch (error) {
    expect(error).toBeInstanceOf(TimeoutError);
  }
});
