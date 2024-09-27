import { render, screen } from "@testing-library/react";
import { MockedFunction, expect, test, vi } from "vitest";

import { Spinner as __Spinner } from "@planria/design/spinner";

import Loading from "./loading";

vi.mock("@planria/design/spinner", () => ({
  Spinner: vi.fn(() => <div data-testid="spinner" />),
}));

const Spinner = __Spinner as MockedFunction<typeof __Spinner>;

function renderSandbox() {
  const result = render(<Loading />);

  return {
    result,
    getByTestId: screen.getByTestId,
    getByText: screen.getByText,
    Spinner,
  };
}

test('<Loading /> should render a descriptive text, i.e., "Welcome to planria ❤️"', function () {
  const text = "Welcome to planria ❤️";

  const { getByText } = renderSandbox();

  const textElement = getByText(text);
  expect(textElement).toBeDefined();
});

test("<Loading /> should render a spinner", function () {
  const testId = "spinner";

  const { getByTestId } = renderSandbox();

  const spinnerElement = getByTestId(testId);
  expect(spinnerElement).toBeDefined();
});
