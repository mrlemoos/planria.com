"use client";

import { useEffect, useState, type JSX } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type Stripe from "stripe";

import { getCheckoutSession } from "$/app/api/checkout_sessions/client";
import { PURCHASES_EMAIL } from "$/server/meta";

export default function Page(): JSX.Element | null {
  const [status, setStatus] = useState<Stripe.Checkout.Session.Status | null>(
    null
  );
  const [customerEmail, setCustomerEmail] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        return;
      }

      try {
        const response = await getCheckoutSession(sessionId);
        setStatus(response.status);
        setCustomerEmail(response?.customer_email);
      } catch (error) {
        console.error(error);
        router.back();
      }
    })();
  }, [searchParams, router]);

  useEffect(() => {
    if (status === "open") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent
          to&nbsp;
          {customerEmail}. If you have any questions, please email&nbsp;
          <Link href={`mailto:${PURCHASES_EMAIL}`}>{PURCHASES_EMAIL}</Link>.
        </p>
      </section>
    );
  }

  return null;
}
