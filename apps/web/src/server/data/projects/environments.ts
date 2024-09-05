import { cache } from "react";

import { db, eq, type InferInsertModel } from "@planria/db";
import { environments } from "@planria/db/datasource";
import { log } from "@planria/util/logging";

import { Environment } from "$/lib/schemas/projects/environments";

/**
 * Creates a new environment and returns the created environment record.
 * If an error occurs, null is returned.
 * @param data The data for the new environment.
 * @returns A Promise that resolves to the created environment, or null if an error occurred.
 */
export async function createEnvironment(
  data: Pick<InferInsertModel<typeof environments>, "name" | "projectId">
): Promise<Environment | null> {
  try {
    const [createdEnvironment] = await db
      .insert(environments)
      .values(data)
      .returning();
    return createdEnvironment ?? null;
  } catch (error) {
    log.error(
      `An error at createEnvironment() occurred while attempting to create the environment with the following data: ${data}. See the original error as follows: ${error}`
    );
    return null;
  }
}

/**
 * Queries for and fetches an environment by its ID from the database.
 * If an error occurs or the environment is not found, null is returned as result of the promise.
 * @param environmentId The ID of the environment to fetch.
 * @returns A Promise that resolves to the fetched environment or null if not found.
 */
export const fetchEnvironmentsById = cache(
  async (environmentId: string): Promise<Environment | null> => {
    try {
      const [foundEnvironment] = await db
        .select()
        .from(environments)
        .where(eq(environments.environmentId, environmentId));
      return foundEnvironment ?? null;
    } catch (error) {
      log.error(
        `An error at fetchEnvironmentById("${environmentId}") occurred while attempting to query the environment by the following ID string "${environmentId}". See the original error as follows: ${error}`
      );
      return null;
    }
  }
);

/**
 * Queries and fetches a list of environments that are associated with the specified project identified by the project ID.
 * @param projectId The ID of the project.
 * @returns A promise that resolves to an array of environments.
 */
export const fetchEnvironmentsByProjectId = cache(
  async (projectId: string): Promise<Environment[]> => {
    try {
      return await db
        .select()
        .from(environments)
        .where(eq(environments.projectId, projectId));
    } catch (error) {
      log.error(
        `An error at fetchEnvironmentsByProjectId("${projectId}") occurred while attempting to query the environments associated with the project by the following ID string "${projectId}". See the original error as follows: ${error}`
      );
      return [];
    }
  }
);
