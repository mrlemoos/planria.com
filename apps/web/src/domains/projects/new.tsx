"use client";

import { useEffect, type JSX, type ReactNode } from "react";

import { Button } from "@planria/design/button";
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
import { Icon } from "@planria/design/icon";
import { Input } from "@planria/design/input";
import { Textarea } from "@planria/design/textarea";
import { useToast } from "@planria/design/toast";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { muted } from "@planria/design/typography";
import { randomAdjective, randomNoun } from "@planria/util/strings";
import { useFormState, useFormStatus } from "react-dom";

import { useProjectManagementRouter } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import { useFormAction } from "$/lib/hooks/form";
import { useUser } from "$/lib/hooks/user";

import { createProjectSchema, type CreateProjectFormValues } from "./schema";
import { createProjectAction } from "./server-actions";

export interface NewProjectProps {
  children?: ReactNode;
}

function generateRandomSlug(): string {
  return [randomAdjective(), randomNoun()].join("-");
}

export function SubmitButton(): JSX.Element {
  const { pending: isPending } = useFormStatus();

  return (
    <Button type="submit" className="h-11 min-w-24" isLoading={isPending}>
      Create
    </Button>
  );
}

export function NewProject({ children }: NewProjectProps): JSX.Element {
  const { user } = useUser();
  const [{ message, ok, createdProjectId }, formAction] = useFormState(
    createProjectAction,
    {
      message: "",
      ok: false,
    },
  );
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      slug: generateRandomSlug(),
      // ownerId: user?.userId,
    },
  });
  const { toast } = useToast();
  const { boundFormRef, handleSubmit } = useFormAction(form, formAction);
  const pushToProject = useProjectManagementRouter();

  useEffect(() => {
    if (!message) {
      return;
    }

    if (ok && createdProjectId) {
      toast({
        title: "Project created 🚀",
        description: "You'll be redirected to your projects now.",
        variant: "success",
      });

      setTimeout(() => {
        pushToProject(createdProjectId);
      }, 5000);
    } else {
      toast({
        description: message,
        variant: "error",
      });
    }
  }, [message, ok, toast, pushToProject, createdProjectId]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        ref={boundFormRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Spaceship to Mars" />
              </FormControl>
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
              <p className={muted({ className: "text-sm" })}>(Optional)</p>
              <FormControl>
                {/* @ts-expect-error FIXME */}
                <Textarea
                  {...field}
                  placeholder="We'll create a ship nice and shiny, buy a comfy pilot seat, and a cockpit full of buttons..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-1">
                <FormLabel>Project slug</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild={true}>
                    <button type="button">
                      <span className="sr-only">See more info</span>
                      <Icon name="InfoCircled" size={16} aria-hidden="true" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex flex-col gap-3 max-w-80"
                  >
                    <span>
                      The slug is a lowercase, dash-separated string that
                      identifies your project for developers.
                    </span>
                    <span>
                      <strong>Note:</strong> these must be unique across all
                    </span>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ownerId"
          defaultValue={user?.userId}
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <FormFooter>
          <SubmitButton />
        </FormFooter>
        {children}
      </form>
    </Form>
  );
}
