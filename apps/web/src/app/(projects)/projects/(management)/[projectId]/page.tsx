import type { JSX } from "react";

import type { Metadata } from "next";

import { Dashboard } from "$/domains/projects/management/dashboard";
import { fetchProjectById } from "$/server/data/projects";
import { APP_NAME } from "$/server/meta";
import { createMetadata } from "$/server/seo";

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}): Promise<Metadata> {
  const foundProject = await fetchProjectById(params.projectId);

  if (!foundProject) {
    return createMetadata({ noIndex: true });
  }

  return createMetadata({
    title: `${APP_NAME} | ${foundProject.name}`,
    noIndex: true,
  });
}

export default function Page(): JSX.Element {
  return <Dashboard />;
}
