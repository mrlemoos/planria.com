import type { JSX } from "react";

import { getUser } from "$/lib/auth/server";
import { fetchProjectsOwnedByAndAssociatedWithCurrentUser } from "$/server/data/projects";

import {
  ProjectSelectorMenu,
  ProjectSelectorMenuContent,
  ProjectSelectorMenuTrigger,
} from "./selector-menu";

export async function ProjectSelector(): Promise<JSX.Element> {
  const projects = await fetchProjectsOwnedByAndAssociatedWithCurrentUser();
  const user = await getUser();

  return (
    <ProjectSelectorMenu>
      <ProjectSelectorMenuTrigger />
      <ProjectSelectorMenuContent
        currentUserId={user!.userId}
        projects={projects}
      />
    </ProjectSelectorMenu>
  );
}
