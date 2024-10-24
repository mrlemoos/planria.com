"use client";

import { type JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@planria/design/card";
import { cn } from "@planria/design/css";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { heading } from "@planria/design/typography";

import { useEnvironments } from "$/domains/environments/context";
import { TableView } from "$/domains/feature-flags/table-view";
import type { Environment } from "$/lib/schemas/projects/environments";

import { useProjectManagement } from "./context";
import { CreateFlagButton } from "./create-flag-button";
import { DisabledCreateFlagButton } from "./disabled-create-flag-button";

function canCreateFeatureFlag(environments: Environment[]): boolean {
  return environments.length > 0;
}

export function Dashboard(): JSX.Element {
  const { name, slug, projectId } = useProjectManagement();
  const { environments } = useEnvironments();

  return (
    <div className="mx-auto container min-h-[70dvh]">
      <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 py-3">
        <div className="flex flex-col md:flex-row md:justify-between items-stretch md:items-center mt-3 mx-6">
          <section className="flex items-center gap-1">
            <h1 className={cn(heading({ variant: "h3" }), "font-bold ml-5")}>
              {name}
            </h1>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="secondary">{slug}</Badge>
              </TooltipTrigger>
              <TooltipContent side="right">
                This is your project&apos;s unique slug.
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </section>
          <div className="flex items-center gap-1">
            {canCreateFeatureFlag(environments) ? (
              <CreateFlagButton />
            ) : (
              <DisabledCreateFlagButton projectId={projectId} />
            )}
          </div>
        </div>
        <main className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Feature flags</CardTitle>
            </CardHeader>
            <CardContent>
              <TableView />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
