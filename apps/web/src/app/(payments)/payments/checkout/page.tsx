import type { JSX } from "react";

import { CheckoutForm } from "$/domains/payments/checkout/form";

// https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/app/components/CheckoutForm.tsx

export default function Page(): JSX.Element {
  return <CheckoutForm />;
}
