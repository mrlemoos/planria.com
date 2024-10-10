"use client";

import { useEffect, type JSX } from "react";

import { Button } from "@planria/design/button";
import { Form, FormFooter, useForm, zodResolver } from "@planria/design/form";
import { useToast } from "@planria/design/toast";
import { useFormState } from "react-dom";

import { useFormAction } from "$/lib/hooks/form";

import { EmailFormField } from "../components/email-form-field";
import { FamilyNameFormField } from "../components/family-name-form-field";
import { GivenNameFormField } from "../components/given-name-form-field";
import {
  subscribeToNewsletterSchema,
  type SubscribeToNewsletter,
} from "../schema";
import { subscribeToNewsletterAction } from "../server-actions";

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
        <EmailFormField />
        <div className="flex flex-col md:flex-row items-center gap-1">
          <GivenNameFormField />
          <FamilyNameFormField />
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
