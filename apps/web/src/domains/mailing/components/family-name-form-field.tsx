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

export function FamilyNameFormField(): JSX.Element {
  const form = useFormContext<SubscribeToNewsletter>();

  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last name</FormLabel>
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
  );
}
