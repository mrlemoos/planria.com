"use server";

import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";
import { ZodError } from "@planria/util/zod";

import { createProject } from "$/server/data/projects";

import { createProjectSchema, type CreateProjectFormValues } from "./schema";

interface FormState {
  message: string;
  ok: boolean;
  issues?: string[];
  createdProjectId?: string;
}

export async function createProjectAction(
  _previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const formValues = tryParseFormData<CreateProjectFormValues>(formData);

  if (!formValues) {
    return {
      message: "Invalid form data",
      ok: false,
    };
  }

  try {
    const data = createProjectSchema.parse(formValues);

    const createdProject = await createProject(data);

    if (!createdProject) {
      return {
        message: "It was not possible to create the project. Please try again.",
        ok: false,
      };
    }

    return {
      message: "Project created successfully",
      createdProjectId: createdProject?.projectId,
      ok: true,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      log.error(
        `An error occurred while validating the form data at createProjectAction(). See the error as follows: ${error}`
      );
      return {
        message: "Invalid form data",
        ok: false,
        issues: error.issues.map((issue) => issue.message),
      };
    }

    log.error(
      `An error occurred within the database statement at createProjectAction(). See the error as follows: ${error}`
    );
    return {
      message: "Unknown error",
      ok: false,
    };
  }
}
