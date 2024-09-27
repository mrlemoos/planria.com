import { render, screen } from "@testing-library/react";
import { expect, test, vi, type MockedFunction } from "vitest";

import { MarketingHeader as __MarketingHeader } from "$/domains/shared/marketing/header";

import Layout from "./layout";

vi.mock("$/domains/shared/marketing/header", () => ({
  MarketingHeader: vi.fn(() => <div data-testid="marketing-header" />),
}));

const MarketingHeader = __MarketingHeader as MockedFunction<
  typeof __MarketingHeader
>;

test("renders <MarketingHeader /> component", function () {
  const testId = "marketing-header";

  render(
    <Layout>
      <div />
    </Layout>
  );
  const marketingHeader = screen.getByTestId(testId);

  expect(marketingHeader).toBeDefined();
  expect(MarketingHeader).toHaveBeenCalled();
});

test("renders the given children", function () {
  const childText = "Test";

  render(
    <Layout>
      <div>{childText}</div>
    </Layout>
  );

  expect(screen.getByText(childText)).toBeDefined();
});
