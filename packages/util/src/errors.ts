import { ZodError } from "./zod";

/**
 * Checks if the provided error is an instance of ZodError.
 *
 * @param err - The error to check.
 * @returns `true` if the error is an instance of ZodError, `false` otherwise.
 */
export function isZodError<T>(err: unknown): err is ZodError<T> {
  return err instanceof ZodError;
}

/**
 * Represents an error code with a string prefix and a numeric suffix.
 *
 * @template T - The type of the string prefix.
 * @template U - The type of the numeric suffix.
 */
export type ErrorCode<T extends string> = `${T}`;

export function isErrorCode<T extends string>(
  code: string,
  prefix: T
): code is ErrorCode<T> {
  return code.startsWith(prefix);
}

/**
 * Handles an exception and returns an object containing the error code, error message, and optional data.
 * @param code - The error code.
 * @param message - The error message.
 * @param data - Optional additional data associated with the error.
 * @returns An object containing the error code, error message, and optional data.
 */
export function handleException<T extends string = string>(
  code: ErrorCode<T>,
  message: string,
  data?: Record<string, unknown>
) {
  return {
    errorCode: code,
    error: message,
    data,
  } as const;
}
