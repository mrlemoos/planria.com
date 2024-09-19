import { HttpError, HttpStatusCode } from "@planria/util/http";
import { z } from "@planria/util/zod";
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
