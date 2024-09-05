"use client";

import { useEffect, useId, type JSX, type ReactNode } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogContentProps,
  DialogHeader,
  DialogTitle,
} from "@planria/design/dialog";
import { Divider } from "@planria/design/divider";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  useForm,
  zodResolver,
} from "@planria/design/form";
import { Switch } from "@planria/design/switch";
import { toast } from "@planria/design/toast";
import { copyFormData } from "@planria/util/objects";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

import { useFormActionSubmissionHandler } from "$/lib/hooks/form";
import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";

import {
  toggleFeatureFlagSchema,
  type ToggleFeatureFlagFormValues,
} from "./schema";
import { toggleFeatureFlagAction } from "./server-actions";

export interface ToggleFeatureFlagContainerProps
  extends Omit<DialogContentProps, "children"> {
  children: ReactNode;
}

export function ToggleFeatureFlagContainer({
  children,
  className,
  ...props
}: ToggleFeatureFlagContainerProps): JSX.Element {
  const router = useRouter();

  return (
    <Dialog
      variant="dismissable"
      isOpen={true}
      onVisibilityUpdate={(event) => {
        if (!event.isOpen) {
          router.back();
        }
      }}
    >
      <DialogContent {...props} className={cn(className)}>
        <DialogHeader>
          <DialogTitle>Toggle Feature Flag</DialogTitle>
        </DialogHeader>
        {children}
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

export interface ToggleFeatureFlagProps
  extends Pick<FeatureFlag, "description" | "featureFlagId" | "slug"> {
  currentValue: boolean;
}

export function ToggleFeatureFlag({
  currentValue,
  description,
  featureFlagId,
  slug,
}: ToggleFeatureFlagProps): JSX.Element {
  const [{ ok, message }, formAction] = useFormState(toggleFeatureFlagAction, {
    ok: false,
  });
  const form = useForm<ToggleFeatureFlagFormValues>({
    resolver: zodResolver(toggleFeatureFlagSchema),
    defaultValues: {
      featureFlagId,
      slug,
      value: currentValue,
    },
  });
  const isSwitchEnabled = form.watch("value");
  const { boundFormRef, handleSubmit } = useFormActionSubmissionHandler(
    form,
    formAction,
    {
      composeFormData(curr) {
        const formData = copyFormData(curr);
        // workaround for the switch component not setting the value to be
        // carried on by the form data object. Why? The switch is a boolean but
        // form data doesn't support anything but strings.
        formData.set("value", String(form.watch("value")));
        return formData;
      },
    }
  );
  const descriptionId = useId();

  useEffect(() => {
    if (!message) {
      return;
    }

    console.log({ ok, message });

    if (ok) {
      toast({
        title: "Flag toggled!",
        description: message,
        variant: "success",
      });
    } else {
      toast({
        title: "Oops...",
        description:
          "An error occurred while toggling the flag. Please try again.",
        variant: "error",
      });
    }
  }, [message, ok]);

  return (
    <div className="flex flex-col gap-1">
      <Form {...form}>
        <span className="text-sm text-muted-foreground">
          Please toggle the switch below and confirm the action. You can always
          revert this by switching the toggle back or closing this dialog.
        </span>
        <div className="flex flex-col gap-3 mt-6">
          <span
            id={descriptionId}
            className="font-semibold text-sm text-muted-foreground"
          >
            Description
          </span>
          <span
            aria-describedby={descriptionId}
            className="text-sm text-muted-foreground"
          >
            {description}
          </span>
          {/* <Dialog variant="dismissable">
            <DialogTrigger asChild={true}>
              <Button variant="link">Edit description</Button>
            </DialogTrigger>
            <DialogContent>TODO: Implement EDIT DESCRIPTION</DialogContent>
          </Dialog> */}
        </div>
        <Divider />
        <form ref={boundFormRef} action={formAction} onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="featureFlagId"
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex-row justify-center gap-2">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Enabled</FormLabel>
              </FormItem>
            )}
          />
          <FormFooter>
            <Button type="submit" disabled={isSwitchEnabled === currentValue}>
              Confirm
            </Button>
          </FormFooter>
        </form>
      </Form>
    </div>
  );
}
