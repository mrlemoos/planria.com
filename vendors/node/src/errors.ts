import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";

function extractErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return error;
  }

  if (isZodError(error)) {
    return error.errors[0]?.message;
  }

  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
}

export function beautifyAndLogError<T>(error: T) {
  const message = extractErrorMessage(error);
  log.error(message);
}
