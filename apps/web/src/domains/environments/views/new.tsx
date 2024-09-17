"use client";

import { useEffect, type JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@planria/design/form";
import { Input } from "@planria/design/input";
import { useToast } from "@planria/design/toast";
import { muted } from "@planria/design/typography";
import { useFormState } from "react-dom";

import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import { useFormAction } from "$/lib/hooks/form";

import { useEnvironments } from "../context";
import {
  createEnvironmentSchema,
  type CreateEnvironmentFormValues,
} from "../schema";
import { createEnvironmentAction } from "../server-actions";

export function NewEnvironment(): JSX.Element {
  const [{ ok, message, issues }, formAction] = useFormState(
    createEnvironmentAction,
    {
      ok: false,
    }
  );
  const { environments } = useEnvironments();
  const projectId = useProjectId();
  const form = useForm<CreateEnvironmentFormValues>({
    mode: "all",
    resolver: zodResolver(createEnvironmentSchema),
    defaultValues: {
      name: "",
    },
  });
  const { boundFormRef, handleSubmit } = useFormAction(form, formAction);
  const { toast } = useToast();

  useEffect(() => {
    if (ok) {
      toast({
        title: "Created!",
        description: message,
        variant: "success",
      });
    } else if (message || issues) {
      toast({
        title: "Error!",
        description:
          message ?? "An unexpected error occurred. Please try again.",
        variant: "error",
      });
    }
  }, [issues, message, ok, toast]);

  useEffect(() => {
    const name = form.getValues("name");

    if (!name) {
      if (environments.length === 0) {
        // If there are no environments, set the default name to "Production"
        form.setValue("name", "Production");
        return;
      }

      if (environments.length === 1 && environments[0].name === "Production") {
        // If there is only one environment and it is "Production", set the default name to "Development"
        form.setValue("name", "Development");
      }
    }
  }, [environments, form]);

  return (
    <div>
      <p className={cn(muted(), "my-5 text-base")}>
        The feature flags are enabled for each environment. You can create a new
        environment to manage your feature flags.
      </p>

      <Form {...form}>
        <form ref={boundFormRef} action={formAction} onSubmit={handleSubmit}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Production" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectId"
            defaultValue={projectId}
            render={({ field }) => <input {...field} type="hidden" />}
          />
          <FormFooter className="mt-4">
            <Button type="submit">Create</Button>
          </FormFooter>
        </form>
      </Form>
    </div>
  );
}
