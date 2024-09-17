"use client";

import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { Icon } from "@planria/design/icon";
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@planria/design/responsive-dialog";
import { useToast } from "@planria/design/toast";

import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";

import { deleteAccessTokenAction } from "../server-actions";

export interface DeleteAccessTokenButtonActionProps {
  accessTokenId: string;
}

export function DeleteAccessTokenButtonAction({
  accessTokenId,
}: DeleteAccessTokenButtonActionProps): JSX.Element {
  const projectId = useProjectId();
  const { toast } = useToast();

  return (
    <ResponsiveDialog variant="dismissable">
      <ResponsiveDialogTrigger asChild={true}>
        <Button variant="outlined" size="sm">
          Delete
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-1">
            <Icon
              name="ExclamationTriangle"
              aria-hidden="true"
              size={30}
              className="text-destructive"
            />
            <span className="ml-2 text-2xl">Be careful</span>
          </ResponsiveDialogTitle>
          <div className="flex flex-col gap-2">
            <span>
              You&apos;re about to delete an access token. If you choose to
              proceed, the access token will&nbsp;
              <strong className="font-semibold">no longer</strong> read or
              modify any feature flag in your project.
            </span>
            <span className="font-medium">
              Are you sure you want to delete this access token?
            </span>
          </div>
          <ResponsiveDialogClose />
          <ResponsiveDialogFooter>
            <Button
              variant="destructive"
              onClick={async () => {
                const formData = new FormData();
                formData.append("accessTokenId", accessTokenId);
                formData.append("projectId", projectId);

                const { ok, message } = await deleteAccessTokenAction(formData);

                if (ok) {
                  toast({
                    title: "Success",
                    description: message,
                    variant: "success",
                  });
                } else {
                  toast({
                    title: "Error",
                    description: message,
                    variant: "error",
                  });
                }
              }}
            >
              I know what I&apos;m doing, delete
            </Button>
            <ResponsiveDialogClose asChild={true}>
              <Button variant="secondary">
                Nah, let&apos;s leave it as-is
              </Button>
            </ResponsiveDialogClose>
          </ResponsiveDialogFooter>
        </ResponsiveDialogHeader>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
