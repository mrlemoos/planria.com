import { OpenAPIGenerator, openapi } from "@planria/util/zod";
import { NextResponse, type NextRequest } from "next/server";

import { env } from "$/server/env";

import packageJSON from "../../../../package.json";

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "force-static";

export function GET(_request: NextRequest): Response {
  const generator = new OpenAPIGenerator(openapi.registry.definitions);
  const docs = generator.generateDocument({
    info: {
      title: "Planria Inc. API",
      termsOfService: "https://www.planria.com/terms",
      version: `${packageJSON.version} (${env("VERCEL_GIT_COMMIT_SHA")})`,
      contact: {
        email: "engineering@planria.com",
        name: "Planria Inc.",
        url: "https://docs.planria.com",
      },
      description:
        "The API is the heart of our SDKs and the Planria platform. It allows you to interact with your projects, environments, and access tokens, and most importantly, the feature flags.",
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0",
      },
    },
    openapi: "3.0.0",
  });

  return NextResponse.json(docs);
}
