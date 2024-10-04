import { render as render__ } from "@testing-library/react";
import { MockedFunction, expect, test, vi } from "vitest";

import { renderSandbox } from "./testing-library+ext";

vi.mock("@testing-library/react", () => ({
  render: vi.fn().mockImplementation((exp) => exp),
  screen: {},
}));

// NOTE: This test has been separated into this file because the `renderSandbox` function
// from the Testing Library must be mocked to be able to be tested in isolation.
// Such mocking is not possible in the same file as the unit tests for the `renderSandbox`
// because it would break the tests for the `render` function itself since no
// virtual DOM would be rendered.
test("renderSandbox() should call the Testing Library render function with the given React Component", () => {
  const renderFn = render__ as unknown as MockedFunction<typeof render__>;
  const jsx = <div>Hello, World!</div>;

  renderSandbox(jsx);

  expect(renderFn).toHaveBeenCalledWith(jsx);
});
