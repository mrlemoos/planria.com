import type { JSX } from "react";

import { cn } from "@planria/design/css";
import { heading } from "@planria/design/typography";

import { EnvironmentsListView } from "$/domains/environments/list-view";
import { fetchEnvironmentsByProjectId } from "$/server/data/projects/environments";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}): Promise<JSX.Element> {
  const environments = await fetchEnvironmentsByProjectId(params.projectId);

  return (
    <div className="mx-auto container">
      <h1 className={cn(heading({ variant: "h3" }), "mt-10")}>Environments</h1>
      <div>
        <EnvironmentsListView environments={environments} />
      </div>
    </div>
  );
}
