import type { JSX } from "react";

import { Button } from "@planria/design/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@planria/design/sheet";
import { uuid } from "@planria/util/uuid";

import { NewAccessTokenForm } from "$/domains/access-tokens/new";
import { fetchEnvironmentsByProjectId } from "$/server/data/projects/environments";

export const dynamic = "force-dynamic";

export default async function ParallelPage({
  params,
}: {
  params: {
    projectId: string;
  };
}): Promise<JSX.Element> {
  const generatedToken = uuid();
  const environments = await fetchEnvironmentsByProjectId(params.projectId);

  return (
    <Sheet>
      <SheetTrigger asChild={true}>
        <Button variant="primary">Generate</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-3">
        <SheetTitle>Access token</SheetTitle>
        <SheetDescription>
          👀 Access tokens are generated to grant access to the feature
          flags&nbsp;
          <b>by environment</b>.<br />
        </SheetDescription>
        <NewAccessTokenForm
          generatedToken={generatedToken}
          projectId={params.projectId}
          environments={environments}
        />
      </SheetContent>
    </Sheet>
  );
}
