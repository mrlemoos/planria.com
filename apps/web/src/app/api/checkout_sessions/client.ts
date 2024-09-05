import { cache } from "react";

import { httpClient } from "@planria/util/http";

import {
  getCheckoutSessionsResponseBodySchema,
  postCheckoutSessionsResponseBodySchema,
  type GetCheckoutSessionsResponseBody,
  type PostCheckoutSessionsResponseBody,
} from "./schema";

export async function createCheckoutSession(): Promise<PostCheckoutSessionsResponseBody> {
  const response = await httpClient.post<PostCheckoutSessionsResponseBody>(
    "/api/checkout_sessions"
  );
  const json = await response.json();
  return postCheckoutSessionsResponseBodySchema.parse(json);
}

export const getCheckoutSession = cache(
  async (sessionId: string): Promise<GetCheckoutSessionsResponseBody> => {
    const response = await httpClient.get(
      `/api/checkout_sessions?session_id=${sessionId}`
    );
    const json = await response.json();
    return getCheckoutSessionsResponseBodySchema.parse(json);
  }
);
