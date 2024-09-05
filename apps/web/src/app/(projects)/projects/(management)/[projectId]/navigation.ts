import { redirect } from "next/navigation";

export function redirectToProject(projectId: string) {
  return redirect(`/projects/${projectId}`);
}
