import { type JSX, type ReactNode } from "react";

import { notFound } from "next/navigation";

import { ProjectManagementProvider } from "$/domains/projects/management/context";
import {
  fetchProjectById,
  fetchProjectFeatureFlagsByProjectId,
} from "$/server/data/projects";

// https://nextjs.org/docs/app/building-your-application/routing/parallel-routes
export default async function Page({
  params,
  children,
  toggle,
}: {
  params: {
    projectId: string;
  };
  children: ReactNode;
  toggle: ReactNode;
}): Promise<JSX.Element> {
  const { projectId } = params;
  const foundProject = await fetchProjectById(projectId);

  if (!foundProject) {
    return notFound();
  }

  const foundFeatureFlags = await fetchProjectFeatureFlagsByProjectId(
    projectId
  );

  return (
    <ProjectManagementProvider
      {...foundProject}
      featureFlags={foundFeatureFlags}
    >
      {children}
      {toggle}
    </ProjectManagementProvider>
  );
}
