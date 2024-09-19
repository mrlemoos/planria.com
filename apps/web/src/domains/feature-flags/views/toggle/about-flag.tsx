"use client";

import { useState, type JSX } from "react";

import { cn } from "@planria/design/css";
import { Divider } from "@planria/design/divider";
import { Spinner } from "@planria/design/spinner";
import { Switch } from "@planria/design/switch";
import { useToast } from "@planria/design/toast";
import { muted } from "@planria/design/typography";
import { date } from "@planria/util/date";
import Link from "next/link";

import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";

import { toggleFeatureFlagDefaultValueAction } from "../../server-actions";

export interface AboutFlagProps {
  featureFlagId: string;
  featureFlagDefaultValue: boolean;
  featureFlagDescription: string;
  featureFlagUpdatedAt: string;
  featureFlagCreatedAt: string;
}

export function AboutFlag({
  featureFlagId,
  featureFlagDefaultValue,
  featureFlagDescription,
  featureFlagCreatedAt,
  featureFlagUpdatedAt,
}: AboutFlagProps): JSX.Element {
  const projectId = useProjectId();
  const { toast } = useToast();
  const [
    isTogglingDefaultValueSubmitting,
    setIsTogglingDefaultValueSubmitting,
  ] = useState(false);

  async function handleToggleFeatureFlag(newValue: boolean) {
    setIsTogglingDefaultValueSubmitting(true);
    const { ok, message } = await toggleFeatureFlagDefaultValueAction(
      newValue,
      featureFlagId
    );
    setIsTogglingDefaultValueSubmitting(false);

    if (!ok) {
      toast({
        title: "Oops...",
        description: message,
        variant: "error",
      });
      return;
    }

    toast({
      title: "Success",
      description: message,
      variant: "success",
    });
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 lg:w-[32%] p-3 md:p-5 rounded-sm">
      <div className="flex flex-col gap-4">
        <span className={muted()}>
          The default value is that which the feature flag will default to in
          case a new environment is created. You can manage your
          environments&nbsp;
          <Link
            href={`/projects/${projectId}/environments`}
            className="underline"
          >
            here
          </Link>
          .
        </span>
        <span className={muted()}>
          Changing this value will not affect the existing environments.
        </span>
        <article className="flex items-center gap-3">
          <span className="font-medium">Default value</span>
          <Switch
            className={cn(isTogglingDefaultValueSubmitting && "cursor-wait")}
            checked={featureFlagDefaultValue}
            disabled={isTogglingDefaultValueSubmitting}
            onCheckedChange={handleToggleFeatureFlag}
          />
          {isTogglingDefaultValueSubmitting && <Spinner />}
        </article>
        <div>
          <Divider />
          <h2 className="font-semibold text-base my-3">
            About this feature flag
          </h2>
          <div className="flex flex-col gap-1">
            <span>
              <b className="font-semibold">Description:</b>&nbsp;
              {featureFlagDescription}
            </span>
            <span>
              <b className="font-semibold">Last updated at:</b>&nbsp;
              {date(featureFlagUpdatedAt).format("DD MMMM YYYY [at] HH:mm A")}
            </span>
            <span>
              <b className="font-semibold">Created at:</b>&nbsp;
              {date(featureFlagCreatedAt).format("DD MMMM YYYY [at] HH:mm A")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
