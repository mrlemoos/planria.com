"use server";

import { isZodError } from "@planria/util/errors";
import { tryParseFormData } from "@planria/util/objects";

import type { Environment } from "$/lib/schemas/projects/environments";
import { createEnvironment } from "$/server/data/projects/environments";

import { revalidatePath } from "next/cache";
import {
  createEnvironmentSchema,
  type CreateEnvironmentFormValues,
} from "./schema";

interface CreateEnvironmentActionFormState {
  ok: boolean;
  createdEnvironment?: Pick<Environment, "name" | "environmentId">;
  message?: string;
  issues?: string[];
}

export async function createEnvironmentAction(
  _previousFormState: CreateEnvironmentActionFormState,
  formData: FormData
): Promise<CreateEnvironmentActionFormState> {
  try {
    const formValues = tryParseFormData<CreateEnvironmentFormValues>(formData);
    const data = createEnvironmentSchema.parse(formValues);

    const createdEnvironment = await createEnvironment(data);
    revalidatePath(`/projects/${data.projectId}/environments`);

    if (!createdEnvironment) {
      return {
        ok: false,
        message: "Failed to create environment. Please try again.",
      };
    }
    return {
      ok: true,
      createdEnvironment: {
        name: createdEnvironment.name,
        environmentId: createdEnvironment.environmentId,
      },
      message: `Environment "${createdEnvironment.name}" created successfully`,
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        ok: false,
        issues: error.issues.map((issue) => issue.message),
        message: "There are issues with the form",
      };
    }
    return {
      ok: false,
      message: "An unknown error occurred",
    };
  }
}
