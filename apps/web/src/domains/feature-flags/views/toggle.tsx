"use client";

import { useState, type JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { Divider } from "@planria/design/divider";
import { Icon } from "@planria/design/icon";
import { Spinner } from "@planria/design/spinner";
import { Switch } from "@planria/design/switch";
import { useToast } from "@planria/design/toast";
import { muted, ul } from "@planria/design/typography";
import Link from "next/link";

import { useEnvironments } from "$/domains/environments/context";
import type {
  EnvironmentFeatureFlag,
  FeatureFlag,
} from "$/lib/schemas/projects/feature-flags";
import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import { useFeatureFlagId } from "$/app/(projects)/projects/(management)/[projectId]/feature-flags/[featureFlagId]/toggle/hooks";

import {
  toggleFeatureFlagDefaultValueAction,
  toggleFeatureFlagEnvironmentValueWithinEnvironmentAction,
} from "../server-actions";

export interface ToggleFeatureFlagListItemProps {
  environmentFeatureFlagId: string;
  value: boolean;
  environmentId: string;
}

export function ToggleFeatureFlagListItem({
  environmentFeatureFlagId,
  value,
  environmentId,
}: ToggleFeatureFlagListItemProps): JSX.Element {
  const { environments } = useEnvironments();
  const environment = environments.find(
    (env) => env.environmentId === environmentId,
  );
  const isProduction =
    environment?.name?.trim()?.toLowerCase() === "production";
  const projectId = useProjectId();
  const featureFlagId = useFeatureFlagId();
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);

  async function handleToggleDefaultValue(newValue: boolean) {
    setSubmitting(true);
    const { ok, message } =
      await toggleFeatureFlagEnvironmentValueWithinEnvironmentAction({
        environmentFeatureFlagId,
        featureFlagId,
        newValue,
        projectId,
      });
    setSubmitting(false);

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
    <li
      key={environmentFeatureFlagId}
      className="flex flex-col items-center gap-1 sm:flex-row border-b border-b-border py-1.5 px-3"
    >
      <span className="flex-1">{environment?.name ?? ""}</span>
      {isSubmitting && <Spinner />}
      <Switch
        checked={!!value}
        disabled={isSubmitting}
        className={cn(isSubmitting && "cursor-wait")}
        onCheckedChange={handleToggleDefaultValue}
      />
      <div className="w-20 ml-2">
        {isProduction && (
          <Button variant="outlined" size="sm" className="gap-1">
            <Icon name="Calendar" size={16} aria-hidden="true" />
            Rollout
          </Button>
        )}
      </div>
    </li>
  );
}

export interface ToggleFeatureFlagProps {
  projectId: string;
  featureFlag: FeatureFlag;
  foundValues: Omit<EnvironmentFeatureFlag, "createdAt" | "updatedAt">[];
}

export function ToggleFeatureFlag({
  projectId,
  foundValues,
  featureFlag,
}: ToggleFeatureFlagProps): JSX.Element {
  const { toast } = useToast();
  const [
    isTogglingDefaultValueSubmitting,
    setIsTogglingDefaultValueSubmitting,
  ] = useState(false);

  async function handleToggleFeatureFlag(newValue: boolean) {
    setIsTogglingDefaultValueSubmitting(true);
    const { ok, message } = await toggleFeatureFlagDefaultValueAction(
      newValue,
      featureFlag.featureFlagId,
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
    <div className="flex flex-col animate-in">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-lg mt-5">
              Feature Flag: {featureFlag.slug}
            </h1>
            <p className={muted()}>
              This page allows you to toggle the value of the feature flag in
              each of the environments.
            </p>
            <ul className={cn(ul(), "[&>li]:max-w-screen-sm mt-1 md:mt-10")}>
              {foundValues.map(
                ({ environmentFeatureFlagId, value, environmentId }) => (
                  <ToggleFeatureFlagListItem
                    key={environmentFeatureFlagId}
                    environmentId={environmentId}
                    environmentFeatureFlagId={environmentFeatureFlagId}
                    value={!!value}
                  />
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-950 lg:w-[32%] p-3 md:p-5 rounded-sm">
          <div className="flex flex-col gap-4">
            <span className={muted()}>
              The default value is that which the feature flag will default to
              in case a new environment is created. You can manage your
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
                className={cn(
                  isTogglingDefaultValueSubmitting && "cursor-wait",
                )}
                checked={featureFlag.defaultValue}
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
              <h3 className="font-medium">Description</h3>
              <p>{featureFlag.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
