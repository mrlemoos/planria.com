import { expect, test } from "vitest";

import { transformHexadecimalToRGB } from "./colors";

test("transformHexadecimalToRGB() should transform #000000 to rgb(0, 0, 0)", () => {
  const input = "#000000";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([0, 0, 0]);
});

test("transformHexadecimalToRGB() should transform #FFFFFF to rgb(255, 255, 255)", () => {
  const input = "#FFFFFF";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([255, 255, 255]);
});

test("transformHexadecimalToRGB() should transform #FF0000 to rgb(255, 0, 0)", () => {
  const input = "#FF0000";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([255, 0, 0]);
});

test("transformHexadecimalToRGB() should transform #00FF00 to rgb(0, 255, 0)", () => {
  const input = "#00FF00";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([0, 255, 0]);
});

test("transformHexadecimalToRGB() should transform #0000FF to rgb(0, 0, 255)", () => {
  const input = "#0000FF";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([0, 0, 255]);
});

test("transformHexadecimalToRGB() should transform #FF00FF to rgb(255, 0, 255)", () => {
  const input = "#FF00FF";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([255, 0, 255]);
});

test("transformHexadecimalToRGB() should transform #00FFFF to rgb(0, 255, 255)", () => {
  const input = "#00FFFF";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([0, 255, 255]);
});

test("transformHexadecimalToRGB() should transform #C0C0C0 to rgb(192, 192, 192)", () => {
  const input = "#C0C0C0";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([192, 192, 192]);
});

test("transformHexadecimalToRGB() should transform #808080 to rgb(128, 128, 128)", () => {
  const input = "#808080";

  const output = transformHexadecimalToRGB(input);

  expect(output).toEqual([128, 128, 128]);
});
