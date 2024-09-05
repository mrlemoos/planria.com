"use server";

import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";
import { revalidatePath } from "next/cache";

import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";
import {
  createProjectFeatureFlag,
  toggleProjectFeatureFlag,
  updateProjectFeatureFlag,
} from "$/server/data/projects";

import {
  ToggleFeatureFlagFormValues,
  createFeatureFlagSchema,
  toggleFeatureFlagSchema,
  updateFeatureFlagSchema,
  type CreateFeatureFlagFormValues,
  type UpdateFeatureFlagFormValues,
} from "./schema";

// #region toggleFeatureFlagAction()

export interface ToggleFeatureFlagActionFormState {
  message?: string;
  issues?: string[];
  ok: boolean;
}

/**
 * The server action to toggle a feature flag based on the provided form data.
 * @param _previousFormState The previous form state (not used in this function).
 * @param formData The form data containing the feature flag information.
 * @returns A promise that resolves to the updated form state after toggling the feature flag.
 */
export async function toggleFeatureFlagAction(
  _previousFormState: ToggleFeatureFlagActionFormState,
  formData: FormData
): Promise<ToggleFeatureFlagActionFormState> {
  const formValues = tryParseFormData<
    Omit<ToggleFeatureFlagFormValues, "value"> & {
      value: "false" | "true";
    }
  >(formData);

  if (!formValues) {
    return {
      message: "Invalid form data",
      ok: false,
    };
  }

  try {
    const data = toggleFeatureFlagSchema.parse({
      ...formValues,
      value: formValues.value === "true",
    });
    const hasUpdated = await toggleProjectFeatureFlag(data.featureFlagId, {
      value: formValues.value === "true",
    });
    if (!hasUpdated) {
      return {
        message:
          "It was not possible to toggle the feature flag. Please try again.",
        ok: false,
      };
    }
    revalidatePath(`/p/${data.slug}`);
    return {
      message: "Feature flag toggled successfully",
      ok: true,
    };
  } catch (error) {
    log.error(
      `An error occurred at the toggleFeatureFlagAction(). Please check the original error as follows: ${error}`,
      `The formValues are as follows: ${JSON.stringify(formValues)}`
    );

    if (isZodError(error)) {
      return {
        issues: error.issues.map((issue) => issue.message),
        message: error.message || "Invalid form data",
        ok: false,
      };
    }
    return {
      message:
        "An error occurred while toggling the feature flag. Please try again.",
      ok: false,
    };
  }
}

// #region updateFeatureFlagAction()

interface UpdateFeatureFlagActionFormState {
  updatedFeatureFlag?: Pick<FeatureFlag, "slug" | "description" | "value">;
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
    revalidatePath(`/p/${updatedFeatureFlag.slug}`);
    return {
      updatedFeatureFlag: {
        slug: updatedFeatureFlag.slug,
        description: updatedFeatureFlag.description,
        value: updatedFeatureFlag.value,
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
    Omit<CreateFeatureFlagFormValues, "value"> & { value: "true" | "false" }
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
      value: formValues.value === "true",
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
