import { expect, test } from "vitest";

import { copyFormData, isObject, tryParseFormData } from "./objects";

test("isObject() returns true for a plain object", function () {
  const plainObject = {};

  const result = isObject(plainObject);

  expect(result).toBe(true);
});

test("isObject() returns true for an object with a prototype", function () {
  const objectWithPrototype = Object.create(null);

  const result = isObject(objectWithPrototype);

  expect(result).toBe(true);
});

test("isObject() returns false for a non-object value", function () {
  const nonObject = 42;

  const result = isObject(nonObject);

  expect(result).toBe(false);
});

test("isObject() returns false for a null value", function () {
  const nullValue = null;

  const result = isObject(nullValue);

  expect(result).toBe(false);
});

test("tryParseFormData() returns an empty object for an empty FormData object", function () {
  const formData = new FormData();

  const result = tryParseFormData(formData);

  expect(result).toEqual({});
});

test("tryParseFormData() returns an object for a FormData object with entries", function () {
  const formData = new FormData();
  formData.append("key", "value");

  const result = tryParseFormData(formData);

  expect(result).toEqual({ key: "value" });
});

test("copyFormData() cannot return the same memory address of the input", function () {
  const formData = new FormData();
  formData.append("key", "value");

  const copy = copyFormData(formData);

  expect(copy).not.toBe(formData);
});
