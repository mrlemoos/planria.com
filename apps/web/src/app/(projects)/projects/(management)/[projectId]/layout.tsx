import { Fragment, type JSX, type ReactNode } from "react";

import { notFound } from "next/navigation";

import { EnvironmentsProvider } from "$/domains/environments/context";
import { ProjectManagementProvider } from "$/domains/projects/management/context";
import { Aside } from "$/domains/shared/aside/aside";
import {
  fetchProjectById,
  fetchProjectFeatureFlagsByProjectId,
} from "$/server/data/projects";
import { fetchEnvironmentsByProjectId } from "$/server/data/projects/environments";

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

  const [foundFeatureFlags, foundEnvironments] = await Promise.all([
    fetchProjectFeatureFlagsByProjectId(projectId),
    fetchEnvironmentsByProjectId(projectId),
  ]);

  return (
    <Fragment>
      <Aside
        projectName={foundProject.name}
        projectSlug={foundProject.slug}
        projectDescription={foundProject.description ?? undefined}
      />
      <ProjectManagementProvider
        {...foundProject}
        featureFlags={foundFeatureFlags}
      >
        <EnvironmentsProvider environments={foundEnvironments}>
          {children}
          {toggle}
        </EnvironmentsProvider>
      </ProjectManagementProvider>
    </Fragment>
  );
}
