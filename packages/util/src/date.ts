import dayjs, { Dayjs, isDayjs } from "dayjs";

export { Dayjs as DateObject, dayjs as date, isDayjs as isDateObject };

export function formatDateToISOStringOrDefault<U>(
  date: Date | number | string | undefined | null,
  defaultValue: U
) {
  return date ? dayjs(date).toISOString() : defaultValue;
}

export function formatDateToISOStringOrDefaultToNull(
  date: Date | number | string | undefined | null
) {
  return formatDateToISOStringOrDefault(date, null);
}
