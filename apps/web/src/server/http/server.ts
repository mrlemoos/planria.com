import { handleException, isZodError } from "@planria/util/errors";
import { HttpStatusCode, isHttpError } from "@planria/util/http";
import { log } from "@planria/util/logging";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Parses the JSON body of a request and returns the parsed data.
 * @template T The type of the parsed data.
 * @param options The options object.
 * @param options.from The NextRequest object representing the incoming request.
 * @returns A promise that resolves to an array containing the parsed data
 *          and any error that occurred during parsing.
 */
export async function parseBodyJSON<T>({
  from: request,
}: {
  from: NextRequest;
}): Promise<[T, null] | [null, /* error */ unknown]> {
  try {
    const data = (await request.json()) as T;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

/**
 * Defines a controller function that handles HTTP requests.
 * @param handlerFn The handler function that processes the request and returns a response.
 * @returns A function that can be used as a controller to handle HTTP requests.
 */
export function defineController(
  handlerFn: (request: NextRequest, context: object) => Promise<Response>
) {
  return async (request: NextRequest, context: object) => {
    try {
      log.info(
        `The endpoint ${request.method} ${request.url} is being handled by the controller...`
      );
      return await handlerFn(request, context);
    } catch (error) {
      log.error(
        `An error occurred at the endpoint ${request.method} ${request.url}. See the original error: ${error}`
      );

      if (isZodError(error)) {
        log.error(
          `A Zod validation has NOT been satisfied. The status 400 will be returned to the client. See the schema errors as follows: ${error
            .flatten()
            .formErrors.join(", ")}`
        );
        return NextResponse.json(
          handleException("INVALID_REQUEST", "Invalid request data", {
            // sends the error to the client because it is a validation error only
            error,
          }),
          { status: HttpStatusCode.BAD_REQUEST }
        );
      }
      if (isHttpError(error)) {
        log.error(
          `An HTTP error has occurred. The status ${error.status} will be returned to the client. See the error message as follows: ${error.message}`
        );
        return NextResponse.json(
          handleException<string>(error.errorCode, error.message),
          { status: error.status }
        );
      }
      log.error(
        "An unknown server error has occurred. The status 500 will be returned to the client. See the original error as follows:",
        error
      );
      return NextResponse.json(
        handleException(
          "UNKNOWN_SERVER_ERROR",
          "An internal server error has occurred. Please try again later."
        ),
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
      );
    }
  };
}
