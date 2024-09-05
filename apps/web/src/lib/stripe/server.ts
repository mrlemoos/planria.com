import { Stripe } from "stripe";

import { env } from "$/server/env";
import { APP_NAME, APP_URL } from "$/server/meta";

export const stripe = new Stripe(env("STRIPE_SECRET_KEY"), {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2024-06-20",
  appInfo: {
    name: APP_NAME,
    url: APP_URL,
  },
});
