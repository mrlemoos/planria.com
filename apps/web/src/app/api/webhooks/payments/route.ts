import { date } from "@planria/util/date";
import { HttpStatusCode } from "@planria/util/http";
import { log } from "@planria/util/logging";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";

import { stripe } from "$/lib/stripe/server";
import {
  createUserPaymentAccount,
  fetchUserPaymentAccountBySubscriptionId,
  fetchUserPaymentAccountByUserId,
  updateUserPaymentAccount,
  updateUserPaymentAccountBySubscriptionId,
} from "$/server/data/users";
import { env } from "$/server/env";

function tryCreateWebhookEvent(
  raw: string,
  signature: string
): { event?: Stripe.Event; error?: unknown } {
  try {
    const event = stripe.webhooks.constructEvent(
      raw,
      signature,
      env("STRIPE_WEBHOOK_SECRET")
    );

    return { event };
  } catch (error) {
    log.error(
      `An error occurred at tryCreateWebhookEvent("${raw}", "${signature}") which did not allow the stripe to build the webhook event to be interpreted. Please see the original error as follows: ${error}`
    );
    return { error };
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  const raw = await request.text();
  const signature = headers().get("Stripe-Signature") as string;
  const { event, error } = tryCreateWebhookEvent(raw, signature);

  if (!event) {
    return NextResponse.json(
      {
        error: `Webhook signature verification failed. ${error}`,
      },
      {
        status: HttpStatusCode.FORBIDDEN,
      }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    // https://medium.com/@salmandotweb/how-i-handle-stripe-subscriptions-in-my-nextjs-saas-boilerplate-3aa79bcd14d2
    case "checkout.session.completed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (
        !session?.metadata?.userId
        // This userId must be the same as provided by Clerk
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid session. It was not possible to identify the user associated with this stripe session.",
          },
          {
            status: HttpStatusCode.BAD_REQUEST,
          }
        );
      }

      const userId = session.metadata.userId;

      const foundUserPaymentAccount = await fetchUserPaymentAccountByUserId(
        userId
      );

      if (!foundUserPaymentAccount) {
        // if there is no user payment account, create one
        const createdPaymentAccount = await createUserPaymentAccount({
          userId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: date(
            subscription.current_period_end * 1000
          ).toISOString(),
        });

        if (!createdPaymentAccount) {
          return NextResponse.json(
            {
              error: `Failed to create user payment account for user ${userId}.`,
            },
            {
              status: HttpStatusCode.INTERNAL_SERVER_ERROR,
            }
          );
        }

        return NextResponse.json(
          {
            message: "User payment account created successfully.",
          },
          {
            status: HttpStatusCode.CREATED,
          }
        );
      }
      // or update the existing one
      const updatedPaymentAccount = await updateUserPaymentAccount(
        foundUserPaymentAccount.paymentAccountId,
        {
          stripeCurrentPeriodEnd: date(
            subscription.current_period_end * 1000
          ).toISOString(),
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
        }
      );

      if (!updatedPaymentAccount) {
        return NextResponse.json(
          {
            error: `Failed to update user payment account for user ${userId}.`,
          },
          {
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          }
        );
      }

      return NextResponse.json(
        {
          message: "User payment account updated successfully.",
        },
        {
          status: HttpStatusCode.OK,
        }
      );
    }
    case "invoice.payment_succeeded": {
      const paymentAccount = await fetchUserPaymentAccountBySubscriptionId(
        session.subscription as string
      );

      if (!paymentAccount) {
        return NextResponse.json(
          {
            error: `No user payment account found for subscription ${session.subscription}.`,
          },
          {
            status: HttpStatusCode.NOT_FOUND,
          }
        );
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      const updatedPaymentAccount =
        await updateUserPaymentAccountBySubscriptionId(subscription.id, {
          stripeCurrentPeriodEnd: date(
            subscription.current_period_end * 1000
          ).toISOString(),
          stripePriceId: subscription.items.data[0].price.id,
        });

      if (!updatedPaymentAccount) {
        return NextResponse.json(
          {
            error: `Failed to update user payment account for subscription ${session.subscription}.`,
          },
          {
            status: HttpStatusCode.INTERNAL_SERVER_ERROR,
          }
        );
      }

      return NextResponse.json(
        {
          message: `User payment account updated successfully.`,
        },
        {
          status: HttpStatusCode.OK,
        }
      );
    }
    default: {
      return NextResponse.json(
        {
          error: `Unhandled event type: ${event.type}`,
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }
  }
}
