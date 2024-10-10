"use client";

import type { JSX } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  useFormContext,
} from "@planria/design/form";
import { Input } from "@planria/design/input";

import type { SubscribeToNewsletter } from "../schema";

export function GivenNameFormField(): JSX.Element {
  const form = useFormContext<SubscribeToNewsletter>();

  return (
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
  );
}
