"use client";

import { useCallback, type JSX } from "react";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createCheckoutSession } from "$/app/api/checkout_sessions/client";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function CheckoutForm(): JSX.Element {
  const fetchClientSecret = useCallback(
    async () => await createCheckoutSession().then((data) => data.clientSecret),
    []
  );
  const options = {
    fetchClientSecret,
  };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
