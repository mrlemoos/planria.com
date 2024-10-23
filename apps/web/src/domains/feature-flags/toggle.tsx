"use client";

import { useOptimistic, useState, type JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { Icon } from "@planria/design/icon";
import { Spinner } from "@planria/design/spinner";
import { Switch } from "@planria/design/switch";
import { useToast } from "@planria/design/toast";
import { muted, ul } from "@planria/design/typography";

import { useFeatureFlagId } from "$/app/(projects)/projects/(management)/[projectId]/feature-flags/[featureFlagId]/toggle/hooks";
import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import { useEnvironments } from "$/domains/environments/context";
import type { Environment } from "$/lib/schemas/projects/environments";
import type {
  EnvironmentFeatureFlag,
  FeatureFlag,
} from "$/lib/schemas/projects/feature-flags";

import { toggleFeatureFlagEnvironmentValueWithinEnvironmentAction } from "./server-actions";

function isProduction(
  environment: Environment | undefined,
): environment is Environment {
  const trimmedEnvironmentLowercasedName = environment?.name
    ?.trim()
    ?.toLowerCase();

  if (!trimmedEnvironmentLowercasedName) {
    return false;
  }

  return (
    trimmedEnvironmentLowercasedName === "production" ||
    trimmedEnvironmentLowercasedName.startsWith("production") ||
    trimmedEnvironmentLowercasedName.endsWith("production")
  );
}

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
  const projectId = useProjectId();
  const featureFlagId = useFeatureFlagId();
  const { toast } = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const [optimisticValue, setOptimisticValue] = useOptimistic(value);

  async function handleToggleDefaultValue(newValue: boolean) {
    if (isSubmitting) {
      return;
    }

    setOptimisticValue(newValue);
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
        checked={optimisticValue}
        className={cn(isSubmitting && "pointer-events-none")}
        onCheckedChange={handleToggleDefaultValue}
      />
      <div className="w-20 ml-2">
        {isProduction(environment) && (
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
  featureFlag: FeatureFlag;
  foundValues: Omit<EnvironmentFeatureFlag, "createdAt" | "updatedAt">[];
}

export function ToggleFeatureFlag({
  foundValues,
  featureFlag,
}: ToggleFeatureFlagProps): JSX.Element {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-lg mt-5">
          Feature Flag: {featureFlag.slug}
        </h1>
        <p className={muted()}>
          This page allows you to toggle the value of the feature flag in each
          of the environments.
        </p>
        <ul className={cn(ul(), "max-w-screen-sm mt-1 md:mt-10")}>
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
  );
}
