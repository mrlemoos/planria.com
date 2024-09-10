import { handleException } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import { log } from "@planria/util/logging";
import { getComputedHttpProtocol } from "@planria/util/proto";
import { NextResponse, type NextRequest } from "next/server";

import { stripe } from "$/lib/stripe/server";
import { fetchUserPaymentAccountByUserId } from "$/server/data/users";
import { env } from "$/server/env";

const VERCEL_URL = env("VERCEL_URL");
const proto = getComputedHttpProtocol();

export async function GET(
  _request: NextRequest,
  context: {
    params: {
      userId: string;
    };
    searchParams: {
      email?: string;
    };
  }
): Promise<Response> {
  const redirectURL = `${proto}://${VERCEL_URL}/account/billing`;

  try {
    if (!context.params.userId) {
      return NextResponse.json(
        handleException(
          "FORBIDDEN",
          "No user ID could be found in the request."
        )
      );
    }

    const subscription = await fetchUserPaymentAccountByUserId(
      context.params.userId
    );

    if (subscription?.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: redirectURL,
      });

      return NextResponse.json(
        {
          url: stripeSession.url,
        },
        {
          status: HttpStatusCode.OK,
        }
      );
    }

    if (!context.searchParams.email) {
      return NextResponse.json(
        handleException(
          "BAD_REQUEST",
          "No email address could be found in the request."
        )
      );
    }

    // https://github.com/Jauharmuhammed/beyondgpt-ai-saas/blob/main/app/api/stripe/route.ts
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: redirectURL,
      cancel_url: redirectURL,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: context.searchParams.email.trim(),
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              // TODO: Update the product name and description
              name: "Earlybird Plan",
              description:
                "The plan for those who believe in Planria from the beginning ❤️",
            },
            unit_amount: 37,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: context.params.userId,
      },
    });

    return NextResponse.json(
      {
        url: stripeSession.url,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    log.error(
      `An error occurred at GET /api/integrations/stripe/${context.params.userId} route. See the original error as follows: ${error}`
    );
    return NextResponse.json(
      handleException(
        "UNKNOWN_ERROR",
        "An error occurred while fetching the user payment account."
      ),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
