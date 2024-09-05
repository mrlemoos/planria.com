"use client";

import type { JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@planria/design/dialog";
import { Icon } from "@planria/design/icon";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { heading } from "@planria/design/typography";

import { BoxCard, BoxCardContent } from "$/domains/feature-flags/box-card";
import { NewFeatureFlagForm } from "$/domains/feature-flags/new";
import { TableView } from "$/domains/feature-flags/table-view";

import { useProjectManagement } from "./context";

export function Dashboard(): JSX.Element {
  const { name, slug } = useProjectManagement();

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
            <Dialog variant="dismissable">
              <DialogTrigger asChild={true}>
                <Button type="button" size="sm">
                  <Icon
                    name="Plus"
                    aria-hidden="true"
                    size={15}
                    className="mr-2"
                  />
                  Create flag
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create feature flag</DialogTitle>
                </DialogHeader>
                <NewFeatureFlagForm />
                <DialogClose />
              </DialogContent>
            </Dialog>
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
