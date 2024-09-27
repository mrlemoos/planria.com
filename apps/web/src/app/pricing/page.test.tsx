import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

import Page from "./page";

vi.mock("$/domains/finances/plans-catalogue", () => ({
  PlansCatalogue: vi.fn(() => <div data-testid="plans-catalogue" />),
}));

test("renders <PlansCatalogue /> component", function () {
  const testId = "plans-catalogue";

  render(<Page />);

  expect(screen.getByTestId(testId)).toBeDefined();
});
