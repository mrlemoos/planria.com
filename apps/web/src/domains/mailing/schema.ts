import { z, type Output } from "@planria/util/zod";

export const newsletterRecipientSchema = z.object({
  recipientId: z.number(),
  email: z.string().min(1, "Required").email(),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().nullable(),
});

export type NewsletterRecipient = Output<typeof newsletterRecipientSchema>;

export const subscribeToNewsletterSchema = newsletterRecipientSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
});

export type SubscribeToNewsletter = Output<typeof subscribeToNewsletterSchema>;
