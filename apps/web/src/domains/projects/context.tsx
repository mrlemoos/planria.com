"use client";

import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type ReactNode,
} from "react";

import type { Project } from "$/lib/schemas/projects";
import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";

export interface ProjectManagementContextValue extends Project {
  featureFlags: FeatureFlag[];
}

const ProjectManagementContext =
  createContext<ProjectManagementContextValue | null>(null);

export interface ProjectManagementProviderProps
  extends ProjectManagementContextValue {
  children: ReactNode;
}

export function ProjectManagementProvider({
  children,
  ...value
}: ProjectManagementProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(() => value, [value]);

  return (
    <ProjectManagementContext.Provider value={memoizedContextValue}>
      {children}
    </ProjectManagementContext.Provider>
  );
}

export function useProjectManagement(): ProjectManagementContextValue {
  const context = useContext(ProjectManagementContext);

  if (context === null) {
    throw new Error(
      "The ProjectManagementContext cannot be accessed due to the component that is trying to access it is not wrapped within the necessary provider. Please make sure the component is wrapped within the ProjectManagementProvider."
    );
  }

  return context;
}
