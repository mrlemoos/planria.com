import { Fragment, useEffect, useMemo, type JSX } from "react";

import { Button } from "@planria/design/button";
import { Divider } from "@planria/design/divider";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@planria/design/select";
import { Switch } from "@planria/design/switch";
import { Textarea } from "@planria/design/textarea";
import { useToast } from "@planria/design/toast";
import { copyFormData } from "@planria/util/objects";
import { useFormState } from "react-dom";

import { useProjectManagement } from "$/domains/projects/context";
import { useFormAction } from "$/lib/hooks/form";

import { FEATURE_FLAG_SLUG_PLACEHOLDER } from "./constants";
import {
  createFeatureFlagSchema,
  type CreateFeatureFlagFormValues,
} from "./schema";
import { createFeatureFlagAction } from "./server-actions";

import { SDKPreview } from "./preview";

export function NewFeatureFlagForm(): JSX.Element {
  const [{ ok, createdFeatureFlag, message }, formAction] = useFormState(
    createFeatureFlagAction,
    {
      ok: false,
    },
  );
  const { projectId } = useProjectManagement();
  const form = useForm<CreateFeatureFlagFormValues>({
    resolver: zodResolver(createFeatureFlagSchema),
    defaultValues: {
      description: "",
      projectId,
      slug: "",
      defaultValue: "",
      valueType: "boolean",
      variations: "",
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

  const valueType = form.watch("valueType");
  const variations = form.watch("variations");

  const variationOptions = useMemo(() => {
    const rawWithoutTrailingComma = variations?.replace(/,\s*$/, "");

    return rawWithoutTrailingComma
      ?.trim()
      .split(",")
      .map((variation) => variation.trim());
  }, [variations]);

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
                  <Textarea {...field} value={field.value!} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Divider />
          <FormField
            control={form.control}
            name="valueType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What kind of value will this feature flag hold?
                </FormLabel>
                <input type="hidden" name={field.name} value={field.value!} />
                <Select
                  defaultValue={field.value!}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="boolean">
                      <span>Boolean&nbsp;</span>
                      <span className="text-muted-foreground text-sm">
                        A simple on/off switch.
                      </span>
                    </SelectItem>
                    <SelectItem value="string">
                      <span>Options&nbsp;</span>
                      <span className="text-muted-foreground text-sm">
                        One of strictly defined values.
                      </span>
                    </SelectItem>
                    <SelectItem value="number">
                      <span>Number&nbsp;</span>
                      <span className="text-muted-foreground text-sm">
                        A numeric value.
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          {valueType === "boolean" && (
            <FormField
              control={form.control}
              name="defaultValue"
              render={({ field }) => (
                <FormItem className="flex-row items-center">
                  <FormControl>
                    <Switch
                      checked={field.value === "true"}
                      onCheckedChange={(newChecked) =>
                        field.onChange(String(newChecked))
                      }
                    />
                  </FormControl>
                  <FormLabel>Will it be enabled by default?</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {valueType === "string" && (
            <Fragment>
              <FormField
                control={form.control}
                name="variations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variations</FormLabel>
                    <FormControl>
                      <Textarea {...field} value={field.value!} />
                    </FormControl>
                    <FormDescription>
                      A list of possible values, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!!variationOptions?.length && (
                <FormField
                  control={form.control}
                  name="defaultValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default value</FormLabel>
                      <input
                        type="hidden"
                        name={field.name}
                        value={field.value!}
                      />
                      <Select
                        defaultValue={field.value!}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {variationOptions?.map((variation) => (
                            <SelectItem key={variation} value={variation}>
                              {variation}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}
            </Fragment>
          )}
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
