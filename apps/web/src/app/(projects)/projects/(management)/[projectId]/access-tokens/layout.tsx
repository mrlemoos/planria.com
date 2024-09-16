import type { JSX, ReactNode } from "react";

import { cn } from "@planria/design/css";
import { heading } from "@planria/design/typography";

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className={cn(heading({ variant: "h3" }), "mt-20 mb-10")}>
            Access tokens
          </h1>
          {generate}
        </div>
        <div className="min-h-[50dvh]">{children}</div>
      </div>
    </AccessTokensProvider>
  );
}
