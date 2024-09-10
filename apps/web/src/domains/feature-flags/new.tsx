import { useEffect, type JSX } from "react";

import { Button } from "@planria/design/button";
import { Divider } from "@planria/design/divider";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormHint,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@planria/design/form";
import { Input } from "@planria/design/input";
import { Switch } from "@planria/design/switch";
import { Textarea } from "@planria/design/textarea";
import { useToast } from "@planria/design/toast";
import { copyFormData } from "@planria/util/objects";
import { useFormState } from "react-dom";

import { useProjectManagement } from "$/domains/projects/management/context";
import { useFormAction } from "$/lib/hooks/form";

import { FEATURE_FLAG_SLUG_PLACEHOLDER } from "./constants";
import { SDKPreview } from "./preview";
import {
  createFeatureFlagSchema,
  type CreateFeatureFlagFormValues,
} from "./schema";
import { createFeatureFlagAction } from "./server-actions";

export function NewFeatureFlagForm(): JSX.Element {
  const [{ ok, createdFeatureFlag, message }, formAction] = useFormState(
    createFeatureFlagAction,
    {
      ok: false,
    }
  );
  const { projectId } = useProjectManagement();
  const form = useForm<CreateFeatureFlagFormValues>({
    resolver: zodResolver(createFeatureFlagSchema),
    defaultValues: {
      description: "",
      projectId,
      slug: "",
      defaultValue: false,
    },
  });
  const { boundFormRef, handleSubmit } = useFormAction(form, formAction, {
    composeFormData(curr) {
      const formData = copyFormData(curr);
      // workaround for the switch component not setting the value to be
      // carried on by the form data object. Why? The switch is a boolean but
      // form data doesn't support anything but strings.
      formData.set("value", String(form.watch("defaultValue")));
      return formData;
    },
  });
  const { toast } = useToast();

  useEffect(() => {
    if (!message) {
      return;
    }

    if (createdFeatureFlag?.slug) {
      toast({
        title: "Operation pending...",
        description:
          "The service has not yet returned your created feature flag.",
        variant: "warning",
      });
      return;
    }

    if (ok) {
      toast({
        title: "Feature flag created",
        description: `${createdFeatureFlag?.slug} has been created successfully.`,
        variant: "success",
      });
    } else {
      toast({
        title: "Error",
        description: message,
        variant: "error",
      });
    }
  }, [ok, message, toast, createdFeatureFlag?.slug]);

  return (
    <div className="flex flex-col gap-5">
      <span className="text-muted-foreground">
        Did you know feature flags reduce stress among your team?
      </span>
      <Form {...form}>
        <form
          action={formAction}
          ref={boundFormRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-1 space-y-2"
        >
          <FormField
            control={form.control}
            name="projectId"
            defaultValue={projectId}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={FEATURE_FLAG_SLUG_PLACEHOLDER}
                    maxLength={25}
                  />
                </FormControl>
                <FormHint>
                  A unique identifier for your feature flag, e.g.
                  &quot;sales-dashboard-v2&quot;
                </FormHint>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  {/* @ts-expect-error */}
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="defaultValue"
            render={({ field }) => (
              <FormItem className="flex-row items-center">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Will it be enabled by default?</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="hidden md:flex flex-col gap-1">
            <Divider />
            <span className="font-semibold mt-1">Preview</span>
            <span className="text-muted-foreground mb-1">
              Check out how your feature flag will look in the codebase.
            </span>
            <SDKPreview />
            <Divider />
          </div>
          <FormFooter>
            <Button type="submit">Create</Button>
          </FormFooter>
        </form>
      </Form>
    </div>
  );
}
