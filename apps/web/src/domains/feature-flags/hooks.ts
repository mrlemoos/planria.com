import { useOptimistic, useState } from "react";

import { useToast } from "@planria/design/toast";

import { toggleFeatureFlagDefaultValueAction } from "./server-actions";

export function useTogglingDefaultValueController({
  featureFlagId,
  featureFlagDefaultValue,
}: {
  featureFlagId: string;
  featureFlagDefaultValue: boolean;
}) {
  const { toast } = useToast();
  const [
    isTogglingDefaultValueSubmitting,
    setIsTogglingDefaultValueSubmitting,
  ] = useState(false);
  const [optimisticValue, setOptimisticValue] = useOptimistic(
    featureFlagDefaultValue,
  );

  async function handleToggleFeatureFlag(newValue: boolean) {
    if (isTogglingDefaultValueSubmitting) {
      // we don't want the user to try and toggle the feature flag again while the first request
      // was not completed on the server side
      return;
    }

    setOptimisticValue(newValue);
    setIsTogglingDefaultValueSubmitting(true);
    const { ok, message } = await toggleFeatureFlagDefaultValueAction(
      newValue,
      featureFlagId,
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

  return {
    isTogglingDefaultValueSubmitting,
    handleToggleFeatureFlag,
    optimisticValue,
  };
}
