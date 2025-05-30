import type { JSX } from "react";
import { expect, test, vi } from "vitest";

import {
  renderHook,
  renderSandbox,
  renderSandboxAsync,
} from "./testing-library+ext";

test("renderHook() should render the result of a custom hook", () => {
  function useCustomHook(): number {
    return 42;
  }

  const { result } = renderHook(useCustomHook);

  expect(result.current).toBe(42);
});

test("renderSandbox() should render the JSX of a React Component", () => {
  function Component(): JSX.Element {
    return <div>Hello, World!</div>;
  }

  const { screen } = renderSandbox(<Component />);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
});

test("renderSandboxAsync() should render the JSX of a React Server Component (RSC)", async () => {
  async function ServerComponent(): Promise<JSX.Element> {
    return <div>Hello, World!</div>;
  }

  const { screen } = await renderSandboxAsync(ServerComponent);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
});

test("renderSandboxAsync() should call once the asynchronous function in the React Server Component (RSC) body", async () => {
  const asyncFn = vi.fn().mockResolvedValue({});
  async function ServerComponent(): Promise<JSX.Element> {
    await asyncFn();
    return <div>Hello, World!</div>;
  }

  const { screen } = await renderSandboxAsync(ServerComponent);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
  expect(asyncFn).toHaveBeenCalled();
});
