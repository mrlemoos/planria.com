"use server";

import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";
import { revalidatePath } from "next/cache";

import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";
import {
  createEnvironmentFeatureFlagValuesPerEnvironment,
  createProjectFeatureFlag,
  deleteProjectFeatureFlag,
  toggleEnvironmentFeatureFlagValue,
  updateProjectFeatureFlag,
} from "$/server/data/projects";

import {
  createFeatureFlagSchema,
  updateFeatureFlagSchema,
  type CreateFeatureFlagFormValues,
  type UpdateFeatureFlagFormValues,
} from "./schema";

export async function deleteFeatureFlagAction({
  featureFlagId,
  projectId,
}: {
  featureFlagId: string;
  projectId: string;
}): Promise<{ ok: boolean; message: string }> {
  const res = await deleteProjectFeatureFlag(featureFlagId);

  if (!res) {
    return {
      ok: false,
      message: "It was not possible to delete the project. Please try again.",
    };
  }

  revalidatePath(`/projects/${projectId}`);
  return {
    ok: true,
    message: "Feature flag deleted successfully",
  };
}

export async function toggleFeatureFlagEnvironmentValueWithinEnvironmentAction({
  environmentFeatureFlagId,
  newValue,
  projectId,
  featureFlagId,
}: {
  environmentFeatureFlagId: string;
  newValue: boolean;
  projectId: string;
  featureFlagId: string;
}): Promise<{ ok: boolean; message: string }> {
  try {
    const updatedEnvironmentFeatureFlag =
      await toggleEnvironmentFeatureFlagValue({
        environmentFeatureFlagId,
        newValue,
      });

    if (updatedEnvironmentFeatureFlag === null) {
      return {
        ok: false,
        message:
          "It was not possible to update the feature flag. Please try again.",
      };
    }
    revalidatePath(
      `/projects/${projectId}/feature-flags/${featureFlagId}/toggle`
    );
    return {
      ok: true,
      message: "The feature flag has successfully been updated.",
    };
  } catch (error) {
    log.error(
      `An error ocurred at toggleFeatureFlagEnvironmentValueWithinEnvironmentAction() server action. See the error as follows: ${error}`
    );
    return {
      ok: false,
      message:
        "An error occurred while updating the feature flag. Please try again.",
    };
  }
}

export async function toggleFeatureFlagDefaultValueAction(
  newValue: boolean | number | string,
  featureFlagId: string
): Promise<{
  ok: boolean;
  message?: string;
}> {
  try {
    const updatedFeatureFlag = await updateProjectFeatureFlag(featureFlagId, {
      defaultValue: String(newValue),
    });
    if (!updatedFeatureFlag) {
      return {
        ok: false,
        message: "It was not possible to update the project. Please try again.",
      };
    }
    revalidatePath(`/projects/${updatedFeatureFlag}`);
    return {
      ok: true,
      message: "Feature flag updated successfully",
    };
  } catch (error) {
    log.error(
      `An error ocurred at toggleFeatureFlagDefaultValue(${newValue}, "${featureFlagId}") server action. See the error as follows: ${error}`
    );
    return {
      ok: false,
      message:
        "An error occurred while updating the feature flag. Please try again.",
    };
  }
}

interface UpdateFeatureFlagActionFormState {
  updatedFeatureFlag?: Pick<
    FeatureFlag,
    "slug" | "description" | "defaultValue"
  >;
  message?: string;
  issues?: string[];
  ok: boolean;
}

/**
 * The server action to update a feature flag based on the provided form data.
 * @param _previousFormState The previous form state (unused).
 * @param formData The form data containing the updated feature flag information.
 * @returns A promise that resolves to the updated feature flag form state.
 */
export async function updateFeatureFlagAction(
  _previousFormState: UpdateFeatureFlagActionFormState,
  formData: FormData
): Promise<UpdateFeatureFlagActionFormState> {
  const formValues = tryParseFormData<UpdateFeatureFlagFormValues>(formData);

  if (!formValues) {
    return {
      message: "Invalid form data",
      ok: false,
    };
  }

  try {
    const data = updateFeatureFlagSchema.parse(formValues);
    const updatedFeatureFlag = await updateProjectFeatureFlag(
      data.featureFlagId,
      data
    );
    if (!updatedFeatureFlag) {
      return {
        message: "It was not possible to update the project. Please try again.",
        ok: false,
      };
    }

    revalidatePath(`/projects/${updatedFeatureFlag.slug}`);
    return {
      updatedFeatureFlag: {
        slug: updatedFeatureFlag.slug,
        description: updatedFeatureFlag.description,
        defaultValue: updatedFeatureFlag.defaultValue,
      },
      message: "Feature flag updated successfully",
      ok: true,
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        issues: error.issues.map((issue) => issue.message),
        message: error.message || "Invalid form data",
        ok: false,
      };
    }
    return {
      message:
        "An error occurred while updating the feature flag. Please try again.",
      ok: false,
    };
  }
}

interface CreateFeatureFlagActionFormState {
  createdFeatureFlag?: Pick<FeatureFlag, "slug">;
  message?: string;
  issues?: string[];
  ok: boolean;
}

/**
 * The server action to create a feature flag action.
 * @param _previousFormState The previous form state.
 * @param formData The form data.
 * @returns A promise that resolves to the updated form state.
 */
export async function createFeatureFlagAction(
  _previousFormState: CreateFeatureFlagActionFormState,
  formData: FormData
): Promise<CreateFeatureFlagActionFormState> {
  const formValues = tryParseFormData<CreateFeatureFlagFormValues>(formData);

  if (!formValues) {
    return {
      message: "Invalid form data",
      ok: false,
    };
  }

  try {
    const data = createFeatureFlagSchema.parse({
      ...formValues,
    });
    const createdFeatureFlag = await createProjectFeatureFlag(data);
    if (!createdFeatureFlag) {
      return {
        message: "It was not possible to create the project. Please try again.",
        ok: false,
      };
    }

    await createEnvironmentFeatureFlagValuesPerEnvironment({
      defaultValue: createdFeatureFlag.defaultValue,
      featureFlagId: createdFeatureFlag.featureFlagId,
      projectId: createdFeatureFlag.projectId,
    });

    revalidatePath(`/projects/${createdFeatureFlag.slug}`);
    return {
      createdFeatureFlag: {
        slug: createdFeatureFlag.slug,
      },
      message: "Feature flag created successfully",
      ok: true,
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        issues: error.issues.map((issue) => issue.message),
        message: error.message || "Invalid form data",
        ok: false,
      };
    }
    return {
      message:
        "An error occurred while creating the feature flag. Please try again.",
      ok: false,
    };
  }
}
