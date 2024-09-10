import { unstable_noStore as noStore } from "next/cache";

import { redirectToProject } from "$/app/(projects)/projects/(management)/[projectId]/navigation";
import { redirectToOnboarding } from "$/app/onboarding/navigation";
import { fetchProjectsOwnedByAndAssociatedWithCurrentUser } from "$/server/data/projects";

export const dynamic = "force-dynamic";

export default async function Page(): Promise<never> {
  noStore();
  const projects = await fetchProjectsOwnedByAndAssociatedWithCurrentUser();

  if (projects.length === 0) {
    return redirectToOnboarding();
  }

  const [project] = projects;

  return redirectToProject(project.projectId);
}
