import { db, type InferInsertModel } from "@planria/db";
import { newsletterRecipients } from "@planria/db/datasource";
import { log } from "@planria/util/logging";

import type { NewsletterRecipient } from "$/domains/mailing/schema";

/**
 * Subscribes an email address to the newsletter.
 */
export async function subscribeToNewsletter(
  data: Omit<
    InferInsertModel<typeof newsletterRecipients>,
    "updatedAt" | "createdAt" | "recipientId"
  >
): Promise<NewsletterRecipient | null> {
  try {
    const [recipient] = await db
      .insert(newsletterRecipients)
      .values(data)
      .returning();
    return recipient;
  } catch (error) {
    log.error(
      `An error occurred at subscribeToNewsletter({ email: "${data.email}" }). See the error as follows: ${error}`
    );
    return null;
  }
}
