/**
 * Awaits a promise and returns the result or throws an error if the promise rejects.
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * An error that is thrown when a timeout is reached.
 */
export class TimeoutError extends Error {
  constructor() {
    super("Timeout reached");
  }
}

/**
 * Wraps a promise with a timeout and rejects it if the timeout is reached.
 * @param ms The timeout duration in milliseconds.
 * @param promise The promise to wrap.
 * @returns A promise that resolves with the result of the input promise,
 *          or rejects with a TimeoutError if the timeout is reached.
 */
export async function timeout<T>(ms: number, promise: Promise<T>): Promise<T> {
  return await new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new TimeoutError());
    }, ms);

    promise.then((result) => {
      clearTimeout(timeoutId);
      resolve(result);
    }, reject);
  });
}
