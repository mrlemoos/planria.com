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

export function EmailFormField(): JSX.Element {
  const form = useFormContext<SubscribeToNewsletter>();

  return (
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
  );
}
