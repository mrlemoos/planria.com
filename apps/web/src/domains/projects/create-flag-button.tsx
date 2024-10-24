import type { JSX } from "react";

import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@planria/design/responsive-dialog";
import { Button } from "@planria/design/button";
import { Icon } from "@planria/design/icon";

import { NewFeatureFlagForm } from "$/domains/feature-flags/new";

export function CreateFlagButton(): JSX.Element {
  return (
    <ResponsiveDialog variant="dismissable">
      <ResponsiveDialogTrigger asChild={true}>
        <Button size="sm" type="button">
          <Icon name="Plus" aria-hidden="true" size={15} className="mr-2" />
          Create flag
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create flag</ResponsiveDialogTitle>
        </ResponsiveDialogHeader>
        <NewFeatureFlagForm />
        <ResponsiveDialogClose />
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
