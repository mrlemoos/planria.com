import { HttpStatusCode } from "@planria/util/http";
import { log } from "@planria/util/logging";
import { NextResponse } from "next/server";
import type { Stripe } from "stripe";

import { stripe } from "$/lib/stripe/server";
import { env } from "$/server/env";

import { STRIPE_SIGNATURE_HEADER } from "./constants";

const permittedEvents = [
  "checkout.session.completed",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
];

export async function POST(req: Request): Promise<Response> {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get(STRIPE_SIGNATURE_HEADER) as string,
      env("STRIPE_WEBHOOK_SECRET") as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    log.error(
      `An error occurred at "POST /api/payments/webhooks". See the error as follows: ${errorMessage}`
    );
    return NextResponse.json(
      {
        message: `Webhook Error: ${errorMessage}`,
      },
      { status: HttpStatusCode.BAD_REQUEST }
    );
  }

  // Successfully constructed event.
  log.debug(
    `✅ The event has successfully been created. [event.id: ${event.id}]`
  );

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          data = event.data.object as Stripe.Checkout.Session;
          log.debug('The received event type is "checkout.session.completed"');
          log.debug(`💰 The CheckoutSession status is: ${data.payment_status}`);
          break;
        }
        case "payment_intent.payment_failed": {
          data = event.data.object as Stripe.PaymentIntent;
          log.debug(
            'The received event type is "payment_intent.payment_failed"'
          );
          log.error(
            `The payment received at "POST /api/payments/webhooks" failed to complete. See the error message as follows: ${data.last_payment_error?.message}`
          );
          break;
        }
        case "payment_intent.succeeded": {
          data = event.data.object as Stripe.PaymentIntent;
          log.debug('The received event type is "payment_intent.succeeded"');
          log.debug(
            `💰 The payment intent succeeded. Its status is "${data.status}"`
          );
          break;
        }
        default: {
          throw new Error(`Unsupported event: ${event.type}`);
        }
      }
    } catch (error) {
      log.error(
        `An error occurred at "POST /api/payments/webhooks" while handling the event. See the error as follows: ${error}`
      );

      return NextResponse.json(
        {
          message: "Webhook handler failed",
        },
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json(
    {
      message: "Received",
    },
    { status: HttpStatusCode.OK }
  );
}
