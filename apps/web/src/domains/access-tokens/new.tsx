"use client";

import { useEffect, useMemo, type JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
  zodResolver,
} from "@planria/design/form";
import { Icon } from "@planria/design/icon";
import { Input, createInputStylesheet } from "@planria/design/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@planria/design/select";
import { useToast } from "@planria/design/toast";
import { useClipboard } from "@planria/react-hooks/clipboard";
import { date } from "@planria/util/date";
import Link from "next/link";
import { useFormState } from "react-dom";

import { useFormAction } from "$/lib/hooks/form";
import type { Environment } from "$/lib/schemas/projects/environments";
import { fontMono } from "$/lib/styles/fonts";

import {
  createAccessTokenSchema,
  type CreateAccessTokenFormValues,
} from "./schema";
import { createAccessTokenAction } from "./server-actions";

export interface NewAccessTokenFormProps {
  generatedToken: string;
  environments: Environment[];
  projectId: string;
}

export function NewAccessTokenForm({
  generatedToken,
  environments,
  projectId,
}: NewAccessTokenFormProps): JSX.Element {
  const form = useForm<CreateAccessTokenFormValues>({
    resolver: zodResolver(createAccessTokenSchema),
    defaultValues: {
      environmentId: "",
      projectId,
      token: generatedToken,
      displayName: "",
    },
  });
  const [{ ok, encryptedToken, message }, formAction] = useFormState(
    createAccessTokenAction,
    {
      ok: false,
    }
  );
  const { boundFormRef, handleSubmit } = useFormAction(form, formAction);
  const [, copyToClipboard] = useClipboard();
  const { toast } = useToast();

  const sortedEnvironmentOptions = useMemo(() => {
    // sort environment by updatedAt date
    return environments.sort(
      (left, right) =>
        date(right.updatedAt).toDate().getTime() -
        date(left.updatedAt).toDate().getTime()
    );
  }, [environments]);

  useEffect(() => {
    if (!message?.length) {
      return;
    }

    if (encryptedToken && ok) {
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
  }, [ok, message, toast, encryptedToken]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        ref={boundFormRef}
        onSubmit={handleSubmit}
        className="h-full flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <input {...field} type="hidden" value={projectId} />
          )}
        />
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>
                Access token
                <span className="text-gray-500 text-sm">&nbsp;(generated)</span>
              </FormLabel>
              <div className={cn(createInputStylesheet(), "pr-2.5")}>
                <FormControl>
                  <input
                    type="text"
                    className={cn(
                      "w-full focus-within:outline-none h-full",
                      fontMono.className
                    )}
                    readOnly={true}
                    {...field}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  size="md"
                  className="font-semibold shadow-md"
                  aria-label="Copy to clipboard"
                  onClick={async () => {
                    await copyToClipboard(field.value);
                    toast({
                      title: "Copied to your clipboard",
                      variant: "coherent",
                    });
                  }}
                >
                  Copy
                </Button>
              </div>
              <div className="flex items-center gap-3 px-3 py-1 rounded-sm bg-amber-200 dark:bg-amber-700">
                <Icon name="ExclamationTriangle" aria-hidden="true" size={32} />
                <FormDescription className="text-black">
                  You&apos;ll be able to see only the&nbsp;
                  <b>4 initial characters</b> of your token later.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="environmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Environment</FormLabel>
              <input type="hidden" name={field.name} value={field.value} />
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Click to select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sortedEnvironmentOptions.map(({ name, environmentId }) => (
                    <SelectItem key={environmentId} value={environmentId}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage, edit, add, and delete your environments&nbsp;
                <Link
                  href={`/projects/${projectId}/environments`}
                  className="underline"
                >
                  here
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Production access token" />
              </FormControl>
              <FormDescription>
                A name to identify this access token.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter className="mt-5">
          <Button type="submit">Save</Button>
        </FormFooter>
      </form>
    </Form>
  );
}
