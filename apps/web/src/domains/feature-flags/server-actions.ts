"use server";

import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";
import { revalidatePath } from "next/cache";

import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";
import {
  createProjectFeatureFlag,
  deleteProjectFeatureFlag,
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

export async function toggleFeatureFlagDefaultValueAction(
  newValue: boolean,
  featureFlagId: string
): Promise<{
  ok: boolean;
  message?: string;
}> {
  try {
    const updatedFeatureFlag = await updateProjectFeatureFlag(featureFlagId, {
      defaultValue: newValue,
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

// #region createFeatureFlagAction()

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
  const formValues = tryParseFormData<
    Omit<CreateFeatureFlagFormValues, "defaultValue"> & {
      defaultValue: "true" | "false";
    }
  >(formData);

  if (!formValues) {
    return {
      message: "Invalid form data",
      ok: false,
    };
  }

  try {
    const data = createFeatureFlagSchema.parse({
      ...formValues,
      defaultValue: formValues.defaultValue === "true",
    });
    const createdFeatureFlag = await createProjectFeatureFlag(data);
    if (!createdFeatureFlag) {
      return {
        message: "It was not possible to create the project. Please try again.",
        ok: false,
      };
    }
    revalidatePath(`/p/${createdFeatureFlag.slug}`);
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
