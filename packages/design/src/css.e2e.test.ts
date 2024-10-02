import { expect, test } from "vitest";

import { cn, stylesheet } from "./css";

test("stylesheet.create() should create box styles with base class", function () {
  const base = "p-4";

  const createBoxStyles = stylesheet.create({
    base,
  });
  const classes = createBoxStyles();

  expect(classes).toEqual("p-4");
});

test("stylesheet.create() should create box styles with variant class", function () {
  const base = "p-4";
  const variants = {
    color: {
      red: "bg-red-500",
    },
  };

  const createBoxStyles = stylesheet.create({
    base,
    variants,
  });
  const classes = createBoxStyles({ color: "red" });

  expect(classes).toEqual("p-4 bg-red-500");
});

test("cn() should merge Tailwind CSS classes", function () {
  const classes = ["p-4", "bg-red-500"];

  const mergedClasses = cn(classes);

  expect(mergedClasses).toEqual("p-4 bg-red-500");
});
