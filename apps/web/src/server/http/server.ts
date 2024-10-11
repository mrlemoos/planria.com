import type { NextRequest } from "next/server";

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
