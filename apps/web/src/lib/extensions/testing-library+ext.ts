import type { JSX, ReactNode } from "react";

import {
  render as render__,
  screen,
  type RenderResult as TestingLibraryRenderResult,
} from "@testing-library/react";

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
export function render(node: ReactNode): RenderResult {
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
 * import { renderAsync } from "$/lib/ext/+testing-library";
 *
 * import { MyComponent } from "./my-component";
 *
 * // ...
 *
 * const { screen } = await renderAsync(MyComponent, { name: "World" });
 * ```
 */
export async function renderAsync<P extends object>(
  ServerComponent: (props?: P) => Promise<JSX.Element | null>,
  props: P = {} as P
): Promise<AsyncRenderResult> {
  const jsx = await ServerComponent(props);
  return render(jsx);
}
