import dayjs from "dayjs";
import { MockedFunction, describe, expect, test, vi } from "vitest";

import { formatDateToISOStringOrDefault } from "./date";

vi.useFakeTimers({
  now: new Date(1970, 0, 1),
  advanceTimeDelta: 0,
  // locks the Date to be Jan. 1st, 1970 at 03:00:00 AM (UTC) - London time.
});

vi.mock("dayjs", function () {
  return {
    default: vi.fn().mockReturnValue({
      toISOString: vi.fn().mockReturnValue("1970-01-01T03:00:00.000Z"),
    }),
    isDayjs: vi.fn().mockReturnValue(false),
  };
});
const dayjsFn = dayjs as MockedFunction<typeof dayjs>;

describe("formatDateToISOStringOrDefault()", function () {
  test("should format the valid date (Date instance) to YYYY-MM-ddTHH:mm:ss.sssZ (ISO) string", function () {
    const input = new Date();

    const iso = formatDateToISOStringOrDefault(input, "__IGNORE__");

    expect(iso).toBe("1970-01-01T03:00:00.000Z");
  });
  test("should format the valid date (date number) to YYYY-MM-ddTHH:mm:ss.sssZ (ISO) string", function () {
    const input = 10800000;

    const iso = formatDateToISOStringOrDefault(input, "__IGNORE__");

    expect(iso).toBe("1970-01-01T03:00:00.000Z");
  });
  test("should format the valid date (date string YYYY-MM-dd) to YYYY-MM-ddTHH:mm:ss.sssZ (ISO) string", function () {
    const input = "1970-01-01";

    const iso = formatDateToISOStringOrDefault(input, "__IGNORE__");

    expect(iso).toBe("1970-01-01T03:00:00.000Z");
  });
  test("should default to and return the default value (i.e. '__DEFAULT_DATE__') for the null input", function () {
    const input = null;

    const iso = formatDateToISOStringOrDefault(input, "__DEFAULT_DATE__");

    expect(iso).toBe("__DEFAULT_DATE__");
  });
  test("should default to and return the default value (i.e. '__DEFAULT_DATE__') for the undefined input", function () {
    const input = undefined;

    const iso = formatDateToISOStringOrDefault(input, "__DEFAULT_DATE__");

    expect(iso).toBe("__DEFAULT_DATE__");
  });
  test("should call dayjs() function from the 'dayjs' module", function () {
    const input = "1970-01-01";

    formatDateToISOStringOrDefault(input, "1970-01-01");

    expect(dayjsFn).toHaveBeenCalledWith(input);
  });
});
