import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@planria/design/dialog";
import { heading } from "@planria/design/typography";

import { EnvironmentsProvider } from "$/domains/environments/context";
import { EnvironmentsListView } from "$/domains/environments/list-view";
import { NewEnvironment } from "$/domains/environments/new";
import { fetchEnvironmentsByProjectId } from "$/server/data/projects/environments";

export default async function Page({
  params,
}: {
  params: { projectId: string };
}): Promise<JSX.Element> {
  const environments = await fetchEnvironmentsByProjectId(params.projectId);

  return (
    <EnvironmentsProvider environments={environments}>
      <div className="mx-auto container">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className={cn(heading({ variant: "h3" }), "mt-20 mb-10")}>
            Environments
          </h1>
          <Dialog variant="dismissable">
            <DialogTrigger asChild={true}>
              <Button>Create environment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create environment</DialogTitle>
              </DialogHeader>
              <NewEnvironment />
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <EnvironmentsListView />
        </div>
      </div>
    </EnvironmentsProvider>
  );
}
