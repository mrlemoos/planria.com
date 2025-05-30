import type { JSX, ReactNode } from "react";

import {
  render as render__,
  screen,
  type RenderResult as TestingLibraryRenderResult,
} from "@testing-library/react";
import {
  renderHook as renderHook__,
  type RenderHookResult as TestingLibraryRenderHookResult,
} from "@testing-library/react-hooks";

/**
 * The interface for the result of a render hook operation.
 */
export interface RenderHookResult<P, R>
  extends TestingLibraryRenderHookResult<P, R> {}

/**
 * Renders a custom hook and returns the result of the render.
 */
export function renderHook<P, R>(
  statement: (input: P) => R,
  options?: { initialProps?: P }
): RenderHookResult<P, R> {
  const {
    rerender,
    result,
    unmount,
    waitFor,
    waitForNextUpdate,
    waitForValueToChange,
  } = renderHook__(statement, options);

  return {
    rerender,
    result,
    unmount,
    waitFor,
    waitForNextUpdate,
    waitForValueToChange,
  };
}

/**
 * The interface for the result of a render operation.
 */
export interface RenderResult
  extends Pick<
    TestingLibraryRenderResult,
    "asFragment" | "baseElement" | "container" | "debug" | "rerender"
  > {
  screen: typeof screen;
}

/**
 * Renders a React component and returns the result of the render.
 */
export function renderSandbox(node: ReactNode): RenderResult {
  const { asFragment, baseElement, container, debug, rerender } =
    render__(node);
  return { asFragment, baseElement, container, debug, rerender, screen };
}

export interface AsyncRenderResult extends RenderResult {}

/**
 * Awaits the result of a React Server Component and then renders it to emulate
 * the behaviour of server-side rendering with asynchronous blocking behaviour.
 *
 * @example
 * ```tsx
 * import { renderSandboxAsync } from "$/lib/ext/+testing-library";
 *
 * import { MyComponent } from "./my-component";
 *
 * // ...
 *
 * const { screen } = await renderSandboxAsync(MyComponent, { name: "World" });
 * ```
 */
export async function renderSandboxAsync<P extends object>(
  ServerComponent: (props?: P) => Promise<JSX.Element | null>,
  props: P = {} as P
): Promise<AsyncRenderResult> {
  const jsx = await ServerComponent(props);
  return renderSandbox(jsx);
}
