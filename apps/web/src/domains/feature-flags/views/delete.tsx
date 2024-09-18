"use client";

import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { Icon } from "@planria/design/icon";
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@planria/design/responsive-dialog";
import { useToast } from "@planria/design/toast";
import { Tooltip, TooltipTrigger } from "@planria/design/tooltip";
import { inlineCode, p, ul } from "@planria/design/typography";
import { create } from "zustand";

import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";

import { Badge } from "@planria/design/badge";
import { deleteFeatureFlagAction } from "../server-actions";

const useConfirmDeleteFeatureFlagController = create<{
  isOpen: boolean;
  featureFlagId: string | null;
  openConfirmDeleteFeatureFlag: (featureFlagId: string) => void;
  closeConfirmDeleteFeatureFlag: () => void;
}>((set) => ({
  isOpen: false,
  featureFlagId: null,
  openConfirmDeleteFeatureFlag: (featureFlagId: string) =>
    set({ isOpen: true, featureFlagId }),
  closeConfirmDeleteFeatureFlag: () =>
    set({ isOpen: false, featureFlagId: null }),
}));

export interface ConfirmDeleteFeatureFlagButtonProps {
  featureFlagId: string;
}

export function ConfirmDeleteFeatureFlagButton({
  featureFlagId,
}: ConfirmDeleteFeatureFlagButtonProps): JSX.Element {
  const { openConfirmDeleteFeatureFlag } =
    useConfirmDeleteFeatureFlagController();
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete feature flag"
          onClick={() => openConfirmDeleteFeatureFlag(featureFlagId)}
        >
          <Icon name="Trash" aria-hidden="true" size={18} />
        </Button>
      </TooltipTrigger>
    </Tooltip>
  );
}

export interface ConfirmDeleteFeatureFlagDialogProps {
  featureFlagSlug: string;
  featureFlagId: string;
}

export function ConfirmDeleteFeatureFlagDialog({
  featureFlagSlug,
  featureFlagId,
}: ConfirmDeleteFeatureFlagDialogProps): JSX.Element | null {
  const { isOpen, closeConfirmDeleteFeatureFlag } =
    useConfirmDeleteFeatureFlagController();
  const projectId = useProjectId();
  const { toast } = useToast();

  if (!isOpen) {
    return null;
  }

  return (
    <ResponsiveDialog
      variant="dismissable"
      isOpen={isOpen}
      onVisibilityUpdate={(event) => {
        if (event.isOpen) {
          closeConfirmDeleteFeatureFlag();
        }
      }}
    >
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Delete Feature Flag</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <p className={p()}>
            Are you sure you want to delete the&nbsp;
            <strong className={inlineCode()}>{featureFlagSlug}</strong>
            &nbsp;feature flag?
            <br />
          </p>
          <ul className={ul()}>
            <li>
              <span className="font-semibold">Flag Recovery:</span>&nbsp;We do
              not delete any data, we just mark the feature flag as deleted so
              you can recover it later <Badge variant="outline">Upcoming</Badge>
            </li>
            <li>
              <span className="font-semibold">Slug Uniqueness:</span>&nbsp;You
              will not be able to use the same slug for a new feature flag -
              unless you rename this one.
            </li>
          </ul>
        </ResponsiveDialogBody>
        <ResponsiveDialogFooter>
          <Button variant="secondary" onClick={closeConfirmDeleteFeatureFlag}>
            Better not, cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              const { ok, message } = await deleteFeatureFlagAction({
                featureFlagId,
                projectId,
              });

              if (ok) {
                closeConfirmDeleteFeatureFlag();
                toast({
                  title: "Success",
                  description: message,
                  variant: "success",
                });
                return;
              }

              toast({
                title: "Error",
                description: message,
                variant: "error",
              });
            }}
          >
            Yes, delete
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
