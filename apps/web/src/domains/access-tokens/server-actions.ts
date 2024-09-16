"use server";

import { hash } from "@planria/util/crypto";
import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";
import { revalidatePath } from "next/cache";

import { createAccessToken } from "$/server/data/projects/access-tokens";

import {
  createAccessTokenSchema,
  type CreateAccessTokenFormValues,
} from "./schema";

interface CreateAccessTokenFormState {
  ok: boolean;
  encryptedToken?: string;
  message?: string;
  issues?: string[];
}

export async function createAccessTokenAction(
  _previousFormState: CreateAccessTokenFormState,
  formData: FormData
): Promise<CreateAccessTokenFormState> {
  const formValues = tryParseFormData<CreateAccessTokenFormValues>(formData);

  if (!formValues) {
    return {
      ok: false,
      message:
        "The form contains invalid data. Please correct the errors and try again.",
    };
  }

  try {
    const data = createAccessTokenSchema.parse(formValues);
    const createdAccessToken = await createAccessToken({
      ...data,
      tokenFourInitialCharacters: data.token.slice(0, 4),
      token: hash(data.token),
    });

    if (!createdAccessToken) {
      log.error(
        "No access token was returned from the data layer. Please check the createAccessToken() function."
      );
      return {
        ok: false,
        message: "An unexpected error occurred. Please try again.",
      };
    }

    revalidatePath(`/projects/${data.projectId}/access-tokens`);
    return {
      ok: true,
      encryptedToken: createdAccessToken?.token,
      message: "The access token has been created successfully.",
    };
  } catch (error) {
    if (isZodError(error)) {
      log.error(
        `An error occurred with the Zod validation for the createAccessTokenAction(). Please find the original error as follows: ${error}`
      );
      return {
        ok: false,
        message:
          "The form contains invalid data. Please correct the errors and try again.",
        issues: error.issues.map((issue) => issue.message),
      };
    }
    log.error(
      `An error occurred with the createAccessTokenAction(). Please find the original error as follows: ${error}`
    );
    return {
      ok: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
