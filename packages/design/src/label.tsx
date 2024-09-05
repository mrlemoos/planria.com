"use client";

import { ComponentPropsWithoutRef, forwardRef, type ElementRef } from "react";

import * as LabelPrimitive from "@radix-ui/react-label";

import { cn, stylesheet, type VariantProps } from "./css";

const labelVariants = stylesheet.create({
  base: "text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
});

export interface LabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, forwardedRef) => (
  <LabelPrimitive.Root
    ref={forwardedRef}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = "Label";
