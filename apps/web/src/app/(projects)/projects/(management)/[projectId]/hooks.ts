import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";

/**
 * Custom hook for project management navigation.
 * Provides a function to navigate to a specific project.
 * @returns An object with a `push` function to navigate to a project.
 */
export function useProjectManagementRouter() {
  const router = useRouter();

  /**
   * Navigates to a specific project.
   * @param projectId The ID of the project to navigate to.
   * @param options The options for navigation.
   * @param options.scroll The scroll behavior for the navigation.
   */
  function push(projectId: string, { scroll }: NavigateOptions = {}) {
    return router.push(`/projects/${projectId}`, { scroll });
  }

  return push;
}
