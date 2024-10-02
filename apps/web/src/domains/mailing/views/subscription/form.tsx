"use client";

import { useEffect, type JSX } from "react";

import { Button } from "@planria/design/button";
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
import { Input } from "@planria/design/input";
import { useToast } from "@planria/design/toast";
import { useFormState } from "react-dom";

import { useFormAction } from "$/lib/hooks/form";

import {
  subscribeToNewsletterSchema,
  type SubscribeToNewsletter,
} from "../../schema";
import { subscribeToNewsletterAction } from "../../server-actions";

export interface SubscriptionFormProps {
  onCancel?: () => void;
}

export function SubscriptionForm({
  onCancel,
}: SubscriptionFormProps): JSX.Element {
  const [{ ok, message, subscribed }, formAction] = useFormState(
    subscribeToNewsletterAction,
    {
      ok: false,
    }
  );
  const form = useForm<SubscribeToNewsletter>({
    mode: "all",
    resolver: zodResolver(subscribeToNewsletterSchema),
  });
  const { boundFormRef, handleSubmit } = useFormAction(form, formAction);
  const { toast } = useToast();

  useEffect(() => {
    if (!message) {
      return;
    }

    if (ok && subscribed) {
      toast({
        title: "Welcome to the Club!",
        description: message,
        variant: "success",
      });
    } else {
      toast({
        title: "Oops...",
        description: message,
        variant: "error",
      });
    }
  }, [message, ok, toast, subscribed]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-1"
        ref={boundFormRef}
        action={formAction}
        onSubmit={handleSubmit}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row items-center gap-1">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="given-name"
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="family-name"
                    autoCapitalize="off"
                    autoCorrect="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormFooter>
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
          {typeof onCancel === "function" && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </FormFooter>
      </form>
    </Form>
  );
}
