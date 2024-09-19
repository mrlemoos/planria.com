import { HttpError, HttpStatusCode } from "@planria/util/http";
import { openapi, z } from "@planria/util/zod";
import { NextResponse } from "next/server";

import { verifyAccessToken } from "$/server/data/projects/access-tokens";
import { defineController } from "$/server/http/server";

interface Context {
  params: {
    projectId: string;
  };
  searchParams?: {
    token?: string;
    environmentId?: string;
  };
}

const contextSchema = z.object({
  params: z.object({
    projectId: z.string().min(1),
  }),
  searchParams: z.object({
    token: z
      .string()
      .min(1, "The token cannot be empty. Please provide a valid token."),
    environmentId: z
      .string()
      .min(
        1,
        "The environmentId cannot be empty. Please provide a valid environmentId."
      ),
  }),
});

openapi.registry.registerPath({
  method: "post",
  path: "/projects/{projectId}/access-tokens/verify",
  summary:
    "Verify an access token generated within Planria to be used to access the Planria API or SDKs.",
  request: {
    params: contextSchema.shape.params,
    query: contextSchema.shape.searchParams,
  },
  responses: {
    [HttpStatusCode.OK]: {
      description:
        "The access token was successfully verified and is valid and authorised to be used to access the Planria API or SDKs for the specific given project within the given environment.",
    },
    [HttpStatusCode.NOT_FOUND]: {
      description:
        "The access token object was not found. Please make sure that this access token is valid and belongs to a project.",
    },
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: {
      description: "An error occurred while verifying the access token.",
    },
    [HttpStatusCode.BAD_REQUEST]: {
      description:
        "The input data provided is invalid. Usually it means that either the `environmentId` or `token` is missing or invalid.",
    },
  },
});

export const POST = defineController<Context>(async (_request, context) => {
  const data = contextSchema.parse(context);

  const result = await verifyAccessToken({
    environmentId: data.searchParams.environmentId,
    projectId: data.params.projectId,
    token: data.searchParams.token,
  });

  if (!result) {
    throw new HttpError(
      HttpStatusCode.NOT_FOUND,
      "The access token object was not found. Please make sure that this access token is valid and belongs to a project.",
      "access-token.object.not.found",
      {}
    );
  }

  return NextResponse.json({}, { status: HttpStatusCode.OK });
});
