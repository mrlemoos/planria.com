import { cache } from "react";

import { db } from "@planria/db";
import {
  featureFlags,
  projectAccessPasses,
  projects,
} from "@planria/db/datasource";
import { cuid } from "@planria/util/crypto";
import { log } from "@planria/util/logging";
import { eq, inArray, sql, type InferInsertModel } from "drizzle-orm";

import { getUser } from "$/lib/auth/server";
import type { Project } from "$/lib/schemas/projects";
import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";

export const fetchProjectById = cache(
  async (projectId: string): Promise<Project | null> => {
    try {
      log.debug(
        `Querying for the project identified by the projectId: ${projectId}`
      );
      const [foundProject] = await db
        .select()
        .from(projects)
        .where(eq(projects.projectId, projectId));
      return foundProject ?? null;
    } catch (error) {
      log.error(
        `An error occurred at fetchProjectById(${projectId}) while attempting to fetch the project identified by the given projectId. Please see the original error: ${error}`
      );
      return null;
    }
  }
);

export async function createProject(
  data: Omit<
    InferInsertModel<typeof projects>,
    "projectId" | "createdAt" | "updatedAt"
  >
): Promise<Project | null> {
  try {
    const [createdProject] = await db
      .insert(projects)
      .values({
        ...data,
        projectId: cuid(),
        createdAt: sql`now()`,
        updatedAt: sql`now()`,
      })
      .returning();
    log.debug(
      `Created the project. [projectId: "${createdProject.projectId}", name: "${createdProject.name}"]`
    );
    return createdProject;
  } catch (error) {
    log.error(
      `An error occurred within the database statement at createProject(). See the error as follows: ${error}`
    );
    return null;
  }
}

export const fetchProjectsOwnedByUser = cache(
  async (userId: string): Promise<Project[]> => {
    try {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.ownerId, userId));
    } catch (error) {
      log.error(
        `An error occurred at fetchProjectsOwnedByUser(${userId}) while attempting to fetch the projects owned by the user identified by the given userId. Please see the original error: ${error}`
      );
      return [];
    }
  }
);

export const fetchProjectsAssociatedWithUser = cache(
  async (userId: string): Promise<Project[]> => {
    try {
      const memberships = await db
        .select({
          projectId: projectAccessPasses.projectId,
        })
        .from(projectAccessPasses)
        .where(eq(projectAccessPasses.accessGrantedTo, userId));
      const associatedProjectIds = memberships.map(
        ({ projectId }) => projectId
      );
      return await db
        .select()
        .from(projects)
        .where(inArray(projects.projectId, associatedProjectIds));
    } catch (error) {
      log.error(
        `An error occurred at fetchProjectsAssociatedWithUser(${userId}) while attempting to fetch the projects accessible to the user identified by the given userId. Please see the original error: ${error}`
      );
      return [];
    }
  }
);

export const fetchProjectsOwnedByAndAssociatedWithCurrentUser = cache(
  async (): Promise<Project[]> => {
    const { userId } = await getUser();
    const [ownedBy, associatedProjects] = await Promise.all([
      fetchProjectsAssociatedWithUser(userId),
      fetchProjectsOwnedByUser(userId),
    ]);
    const allProjects = [...ownedBy, ...associatedProjects];
    return allProjects;
  }
);

export const fetchProjectFeatureFlagsByProjectId = cache(
  async (projectId: string): Promise<FeatureFlag[]> => {
    try {
      const foundFeatureFlags = await db
        .select()
        .from(featureFlags)
        .where(eq(featureFlags.projectId, projectId));
      return foundFeatureFlags;
    } catch (error) {
      log.error(
        `An error occurred at fetchProjectFeatureFlagsByProjectId(${projectId}) while attempting to fetch the feature flags associated with the project identified by the given projectId. Please see the original error: ${error}`
      );

      return [];
    }
  }
);

/**
 * Fetches a project feature flag by its ID. If the feature flag is not found, null is returned.
 * @param featureFlagId - The ID of the feature flag to fetch.
 * @returns A promise that resolves to the found feature flag, or null if not found.
 */
export const fetchProjectFeatureFlagById = cache(
  async (featureFlagId: string): Promise<FeatureFlag | null> => {
    try {
      const [foundFeatureFlag] = await db
        .select()
        .from(featureFlags)
        .where(eq(featureFlags.featureFlagId, featureFlagId));
      return foundFeatureFlag ?? null;
    } catch (error) {
      log.error(
        `An error occurred at fetchProjectFeatureFlagById("${featureFlagId}") while attempting to fetch the feature flag identified by the given featureFlagId. Please see the original error: ${error}`
      );
      return null;
    }
  }
);

/**
 * A server-side function which creates a new feature flag for a project.
 * @param payload The data for the new feature flag.
 * @returns A promise that resolves to the created feature flag, or null if an error occurs.
 */
export async function createProjectFeatureFlag(
  payload: Omit<
    InferInsertModel<typeof featureFlags>,
    "privateId" | "updatedAt" | "createdAt"
  >
): Promise<FeatureFlag | null> {
  try {
    const [createdFeatureFlag] = await db
      .insert(featureFlags)
      .values({
        ...payload,
        updatedAt: sql`now()`,
        createdAt: sql`now()`,
      })
      .returning();
    log.debug(
      `Created the feature flag. [projectId: "${createdFeatureFlag.projectId}", slug: "${createdFeatureFlag.slug}"]`
    );
    return createdFeatureFlag;
  } catch (error) {
    log.error(
      `An error occurred at createProjectFeatureFlag() while attempting to create a feature flag for the project identified by the given projectId. Please see the original error: ${error}`
    );
    return null;
  }
}

/**
 * Updates a project feature flag with the given featureFlagId.
 * @param featureFlagId The ID of the feature flag to update.
 * @param payload The partial data to update the feature flag with.
 * @returns A Promise that resolves to the updated FeatureFlag object, or null if an error occurred.
 */
export async function updateProjectFeatureFlag(
  featureFlagId: string,
  payload: Partial<
    Pick<InferInsertModel<typeof featureFlags>, "description" | "value">
  >
): Promise<FeatureFlag | null> {
  try {
    const [updatedFeatureFlag] = await db
      .update(featureFlags)
      .set({
        ...payload,
        updatedAt: sql`now()`,
      })
      .where(eq(featureFlags.featureFlagId, featureFlagId))
      .returning();
    log.debug(
      `Updated the feature flag. [projectId: "${updatedFeatureFlag.projectId}", slug: "${updatedFeatureFlag.slug}"]`
    );
    return updatedFeatureFlag;
  } catch (error) {
    log.error(
      `An error occurred at updateProjectFeatureFlag() while attempting to update the feature flag identified by the given featureFlagId. Please see the original error: ${error}`
    );
    return null;
  }
}

/**
 * Toggles the feature flag identified by the given featureFlagId.
 * @param featureFlagId The ID of the feature flag to toggle.
 * @param payload The payload containing the partial update for the feature flag value.
 * @returns A promise that resolves to a boolean indicating whether the feature flag was toggled successfully.
 */
export async function toggleProjectFeatureFlag(
  featureFlagId: string,
  payload: Partial<Pick<InferInsertModel<typeof featureFlags>, "value">>
): Promise<boolean> {
  try {
    await db
      .update(featureFlags)
      .set({
        value: payload.value,
        updatedAt: sql`now()`,
      })
      .where(eq(featureFlags.featureFlagId, featureFlagId));
    log.debug(`Toggled the feature flag. [featureFlagId: "${featureFlagId}"]`);
    return true;
  } catch (error) {
    log.error(
      `An error occurred at toggleProjectFeatureFlag() while attempting to toggle the feature flag identified by the given featureFlagId. Please see the original error: ${error}`
    );
    return false;
  }
}
