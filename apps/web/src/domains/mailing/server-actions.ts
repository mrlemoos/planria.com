"use server";

import { isZodError } from "@planria/util/errors";
import { log } from "@planria/util/logging";
import { tryParseFormData } from "@planria/util/objects";

import { subscribeToNewsletter } from "$/server/data/newsletter";

import { subscribeToNewsletterSchema } from "./schema";

interface SubscribeToNewsletterFormState {
  ok: boolean;
  subscribed?: boolean;
  message?: string;
}

/**
 * Subscribes an email address to the newsletter.
 */
export async function subscribeToNewsletterAction(
  _previousState: SubscribeToNewsletterFormState,
  formData: FormData
): Promise<SubscribeToNewsletterFormState> {
  try {
    const formValues = tryParseFormData(formData);

    if (!formValues) {
      return {
        ok: false,
        message:
          "Invalid form data. Please verify the form fields and try again.",
      };
    }
    const data = subscribeToNewsletterSchema.parse(formValues);

    const recipient = await subscribeToNewsletter(data);

    if (!recipient) {
      return {
        ok: false,
        message:
          "An error occurred while subscribing to the newsletter. Please try again later.",
      };
    }

    return {
      ok: true,
      subscribed: true,
      message: "We've sent you a confirmation email. Please check your inbox.",
    };
  } catch (error) {
    if (isZodError(error)) {
      return {
        ok: false,
        message: error.format()._errors[0],
      };
    }
    log.error(
      `An error occurred at subscribeToNewsletter(). See the error as follows: ${error}`
    );
    return {
      ok: false,
    };
  }
}
