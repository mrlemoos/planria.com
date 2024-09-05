import { handleException } from "@planria/util/errors";
import { HttpStatusCode } from "@planria/util/http";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

import { stripe } from "$/lib/stripe/server";
import { isStripeError } from "$/lib/stripe/util";

export async function GET(
  _req: NextRequest,
  context: {
    searchParams: {
      session_id: string;
    };
  }
): Promise<Response> {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      context.searchParams.session_id
    );

    return NextResponse.json(
      {
        status: session.status,
        customer_email: session.customer_details?.email,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (isStripeError(error)) {
      return NextResponse.json(
        handleException(
          "STRIPE_CHECKOUT_SESSION_ERROR",
          "The checkout session could not be retrieved.",
          { error }
        ),
        {
          status: error.statusCode,
        }
      );
    }
    return NextResponse.json(
      handleException(
        "CHECKOUT_SESSION_UNKNOWN_ERROR",
        "An unknown error occurred while retrieving the checkout session.",
        {
          error,
        }
      ),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}

export async function POST(_req: NextRequest): Promise<Response> {
  const origin = headers().get("origin");
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of
          // the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${origin}/payments/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json(
      {
        clientSecret: session.client_secret,
      },
      {
        status: HttpStatusCode.OK,
      }
    );
  } catch (error) {
    if (isStripeError(error)) {
      return NextResponse.json(
        handleException(
          "STRIPE_CHECKOUT_SESSION_ERROR",
          "The checkout session could not be created.",
          { error }
        ),
        {
          status: error.statusCode,
        }
      );
    }
    return NextResponse.json(
      handleException(
        "CHECKOUT_SESSION_UNKNOWN_ERROR",
        "An unknown error occurred while creating the checkout session.",
        {
          error,
        }
      ),
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }
    );
  }
}
