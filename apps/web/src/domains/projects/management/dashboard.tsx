"use client";

import { type JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { Icon } from "@planria/design/icon";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@planria/design/responsive-dialog";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { heading } from "@planria/design/typography";
import Link from "next/link";

import { useEnvironments } from "$/domains/environments/context";
import {
  BoxCard,
  BoxCardContent,
} from "$/domains/feature-flags/views/box-card";
import { NewFeatureFlagForm } from "$/domains/feature-flags/views/new";
import { TableView } from "$/domains/feature-flags/views/table-view";
import type { Environment } from "$/lib/schemas/projects/environments";

import { useProjectManagement } from "./context";

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
              <ResponsiveDialog variant="dismissable">
                <ResponsiveDialogTrigger asChild={true}>
                  <Button size="sm" type="button">
                    <Icon
                      name="Plus"
                      aria-hidden="true"
                      size={15}
                      className="mr-2"
                    />
                    Create flag
                  </Button>
                </ResponsiveDialogTrigger>
                <ResponsiveDialogContent>
                  <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>
                      Create feature flag
                    </ResponsiveDialogTitle>
                  </ResponsiveDialogHeader>
                  <NewFeatureFlagForm />
                  <ResponsiveDialogClose />
                </ResponsiveDialogContent>
              </ResponsiveDialog>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild={true}>
                  <div className="cursor-not-allowed">
                    <Button size="sm" type="button" disabled={true}>
                      Create flag
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  You need to create an environment first. Click&nbsp;
                  <Link
                    href={`/projects/${projectId}/environments`}
                    className="text-primary"
                  >
                    here
                  </Link>
                  &nbsp;to go to environments.
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
        <main className="grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8">
          <BoxCard>
            <BoxCardContent>
              <TableView />
            </BoxCardContent>
          </BoxCard>
        </main>
      </div>
    </div>
  );
}
