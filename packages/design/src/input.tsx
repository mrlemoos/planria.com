"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn, stylesheet } from "./css";

export const createInputStylesheet = stylesheet.create({
  base: "flex h-10 w-full rounded-sm border border-input bg-background px-5 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
});

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, asChild = false, ...props }, forwardedRef) => {
    const Element = asChild ? Slot : "input";

    return (
      <Element
        type={type}
        className={cn(createInputStylesheet(), className)}
        ref={forwardedRef}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
