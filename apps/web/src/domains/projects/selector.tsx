import type { JSX } from "react";

import { fetchProjectsOwnedByAndAssociatedWithCurrentUser } from "$/server/data/projects";

import {
  ProjectSelectorMenu,
  ProjectSelectorMenuContent,
  ProjectSelectorMenuTrigger,
} from "./selector-menu";

export async function ProjectSelector(): Promise<JSX.Element> {
  const projects = await fetchProjectsOwnedByAndAssociatedWithCurrentUser();

  return (
    <ProjectSelectorMenu projects={projects}>
      <ProjectSelectorMenuTrigger />
      <ProjectSelectorMenuContent />
    </ProjectSelectorMenu>
  );
}
