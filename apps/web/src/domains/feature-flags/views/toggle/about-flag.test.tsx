import { MockedFunction, beforeEach, describe, expect, test, vi } from "vitest";

import { useProjectId as __useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import {
  renderSandbox,
  type RenderResult,
} from "$/lib/extensions/testing-library+ext";

import { AboutFlag, type AboutFlagProps } from "./about-flag";
import { useTogglingDefaultValueController as __useTogglingDefaultValueController } from "./hooks";

vi.mock("$/app/(projects)/projects/(management)/[projectId]/hooks", () => ({
  useProjectId: vi.fn().mockReturnValue("__PROJECT_ID__"),
}));
const useProjectId = __useProjectId as MockedFunction<typeof __useProjectId>;

vi.mock("./hooks", () => ({
  useTogglingDefaultValueController: vi.fn().mockReturnValue({
    handleToggleFeatureFlag: vi.fn(),
    isTogglingDefaultValueSubmitting: false,
    optimisticValue: "true",
  }),
}));
const useTogglingDefaultValueController =
  __useTogglingDefaultValueController as MockedFunction<
    typeof __useTogglingDefaultValueController
  >;

function renderSandboxWithDefaults(
  defaultProps: Partial<AboutFlagProps> = {}
): RenderResult {
  const props: AboutFlagProps = {
    featureFlagCreatedAt: "2022-01-01T00:00:00.000Z",
    featureFlagDefaultValue: "true",
    featureFlagDescription: "__DESCRIPTION__",
    featureFlagId: "__ID__",
    featureFlagUpdatedAt: "2022-01-01T00:00:00.000Z",
    featureFlagValueType: "boolean",
    ...defaultProps,
  };

  return renderSandbox(<AboutFlag {...props} />);
}

describe("given that a project ID is found", function () {
  // Arrange
  const projectId = "__PROJECT_ID__";
  beforeEach(() => {
    useProjectId.mockReturnValueOnce(projectId);
  });

  describe("when the <AboutFlag /> component renders", function () {
    test("then the useProjectId() hook is called", function () {
      // Act
      renderSandboxWithDefaults();

      // Assert
      expect(useProjectId).toHaveBeenCalled();
    });
  });
  describe("when the interface is ready", function () {
    test("has an anchor to the environments page for the given project ID", function () {
      // Arrange
      const query = `a[href="/projects/${projectId}/environments"]`;

      // Act
      const { container } = renderSandboxWithDefaults();

      // Assert
      const anchorElement = container.querySelector(query);
      expect(anchorElement).toBeDefined();
    });
    test("has called the useTogglingDefaultValueController() hook with the given feature flag default value and feature flag ID", function () {
      // Arrange
      const featureFlagDefaultValue = "true";
      const featureFlagId = "__ID__";

      // Act
      renderSandboxWithDefaults({ featureFlagDefaultValue, featureFlagId });

      // Assert
      expect(useTogglingDefaultValueController).toHaveBeenCalledWith({
        featureFlagId,
        featureFlagDefaultValue: true,
      });
    });
  });
});
