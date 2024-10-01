import type { JSX } from "react";
import { expect, test, vi } from "vitest";

import { render, renderAsync } from "./testing-library+ext";

test("render() should render the JSX of a React Component", () => {
  function Component(): JSX.Element {
    return <div>Hello, World!</div>;
  }

  const { screen } = render(<Component />);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
});

test("renderAsync() should render the JSX of a React Server Component (RSC)", async () => {
  async function ServerComponent(): Promise<JSX.Element> {
    return <div>Hello, World!</div>;
  }

  const { screen } = await renderAsync(ServerComponent);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
});

test("renderAsync() should call once the asynchronous function in the React Server Component (RSC) body", async () => {
  const asyncFn = vi.fn().mockResolvedValue({});
  async function ServerComponent(): Promise<JSX.Element> {
    await asyncFn();
    return <div>Hello, World!</div>;
  }

  const { screen } = await renderAsync(ServerComponent);

  const helloWorld = screen.getByText("Hello, World!");
  expect(helloWorld).toBeTruthy();
  expect(asyncFn).toHaveBeenCalled();
});
