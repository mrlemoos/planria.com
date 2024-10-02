import { clsx as clsx__ } from "clsx";
import { twMerge as twMerge__ } from "tailwind-merge";
import { MockedFunction, expect, test, vi } from "vitest";

import { cn, toRem } from "./css";

vi.mock("clsx", function () {
  return {
    clsx: vi
      .fn()
      .mockImplementation((...value: string[]) => value.join(" ").trim()),
  };
});
const clsx = clsx__ as MockedFunction<typeof clsx__>;

vi.mock("tailwind-merge", function () {
  return {
    twMerge: vi.fn().mockImplementation((value: string) => value),
  };
});
const twMerge = twMerge__ as MockedFunction<typeof twMerge__>;

test("cn() should call twMerge() and clsx()", function () {
  const input = ["p-4"];

  cn(input);

  expect(clsx).toHaveBeenCalled();
  expect(twMerge).toHaveBeenCalled();
});

test("toRem() should convert pixels to rem", function () {
  const pixels = 16;

  const remValue = toRem(pixels);

  expect(remValue).toEqual("1rem");
});
