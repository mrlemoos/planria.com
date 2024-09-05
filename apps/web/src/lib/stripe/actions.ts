"use server";

import { headers } from "next/headers";
import type { Stripe } from "stripe";

import { CURRENCY_CODE } from "./constants";
import { stripe } from "./server";
import { formatAmountForStripe } from "./util";

export async function createCheckoutSession(
  formData: FormData
): Promise<{ clientSecret: string | null; url: string | null }> {
  const ui_mode = formData.get(
    "uiMode"
  ) as Stripe.Checkout.SessionCreateParams.UiMode;

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      submit_type: "pay",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY_CODE,
            product: formData.get("productId") as string,
            unit_amount: formatAmountForStripe(
              Number(formData.get("customDonation") as string),
              CURRENCY_CODE
            ),
          },
        },
      ],
      // ...(ui_mode === "embedded" && {
      return_url: `${origin}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      // }),
      ui_mode,
    });

  return {
    clientSecret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(
  formData: FormData
): Promise<{ clientSecret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(formData.get("customDonation") as string),
        CURRENCY_CODE
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY_CODE,
    });

  return { clientSecret: paymentIntent.client_secret as string };
}
