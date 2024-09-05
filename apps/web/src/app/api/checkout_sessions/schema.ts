import { z, type Infer } from "@planria/util/zod";

export const postCheckoutSessionsResponseBodySchema = z.object({
  clientSecret: z.string().min(1),
});

export type PostCheckoutSessionsResponseBody = Infer<
  typeof postCheckoutSessionsResponseBodySchema
>;

export const getCheckoutSessionsResponseBodySchema = z.object({
  status: z.enum(["open", "complete", "expired"]),
  customer_email: z.string().optional(),
});

export type GetCheckoutSessionsResponseBody = Infer<
  typeof getCheckoutSessionsResponseBodySchema
>;
