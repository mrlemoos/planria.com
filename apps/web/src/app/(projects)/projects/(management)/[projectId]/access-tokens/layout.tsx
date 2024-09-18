import type { JSX, ReactNode } from "react";

import { cn } from "@planria/design/css";
import { heading, muted } from "@planria/design/typography";

import { AccessTokensProvider } from "$/domains/access-tokens/context";
import { fetchAccessTokensWithEnvironmentByProjectId } from "$/server/data/projects/access-tokens";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
  children,
  generate,
}: {
  params: { projectId: string };
  children: ReactNode;
  generate: ReactNode;
}): Promise<JSX.Element> {
  const foundAccessTokens = await fetchAccessTokensWithEnvironmentByProjectId(
    params.projectId
  );

  return (
    <AccessTokensProvider accessTokens={foundAccessTokens}>
      <div className="mx-auto container">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between">
          <h1 className={cn(heading({ variant: "h3" }), "mt-20 mb-5")}>
            Access tokens
          </h1>
          {generate}
        </div>
        <span className={cn(muted(), "mt-3 mb-10")}>
          The access tokens are randomly generated and encrypted strings that
          allow your application to read and modify your feature flags on the
          fly.
        </span>
        <div className="min-h-[50dvh] mt-5">{children}</div>
      </div>
    </AccessTokensProvider>
  );
}
