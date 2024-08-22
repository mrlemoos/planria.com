import { describe, expect, test } from "vitest";

import {
  containsDigit,
  containsLowercase,
  containsSpecialCharacter,
  containsUppercase,
} from "./strings";

describe("given that the input is a string with digits", function () {
  describe("when the containsDigit() function is called", function () {
    test("returns true", function () {
      const input = "abc123";

      const result = containsDigit(input);

      expect(result).toBe(true);
    });
  });
});
describe("given that the input is a string with no digits", function () {
  describe("when the containsDigit() function is called", function () {
    test("returns false", function () {
      const input = "abc";

      const result = containsDigit(input);

      expect(result).toBe(false);
    });
  });
});

describe("given that the input is a string with lowercase characters", function () {
  describe("when the containsLowercase() function is called", function () {
    test("returns true", function () {
      const input = "abc123";

      const result = containsLowercase(input);

      expect(result).toBe(true);
    });
  });
});
describe("given that the input is a string with no lowercase characters", function () {
  describe("when the containsLowercase() function is called", function () {
    test("returns false", function () {
      const input = "ABC123";

      const result = containsLowercase(input);

      expect(result).toBe(false);
    });
  });
});

describe("given that the input is a string with uppercase characters", function () {
  describe("when the containsUppercase() function is called", function () {
    test("returns true", function () {
      const input = "ABC123";

      const result = containsUppercase(input);

      expect(result).toBe(true);
    });
  });
});
describe("given that the input is a string with no uppercase characters", function () {
  describe("when the containsUppercase() function is called", function () {
    test("returns false", function () {
      const input = "abc123";

      const result = containsUppercase(input);

      expect(result).toBe(false);
    });
  });
});

describe("given that the input is a string with special characters", function () {
  describe("when the containsSpecialCharacter() function is called", function () {
    test("returns true", function () {
      const input = "abc123!";

      const result = containsSpecialCharacter(input);

      expect(result).toBe(true);
    });
  });
});
describe("given that the input is a string with no special characters", function () {
  describe("when the containsSpecialCharacter() function is called", function () {
    test("returns false", function () {
      const input = "abc123";

      const result = containsSpecialCharacter(input);

      expect(result).toBe(false);
    });
  });
});
