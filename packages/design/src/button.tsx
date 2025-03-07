"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn, stylesheet, type VariantProps } from "./css";
import { Ping } from "./ping";

export const createButtonStylesheet = stylesheet.create({
  base: cn(
    "rounded-full transition-all flex items-center justify-center",
    "disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed"
  ),
  variants: {
    // button variants go here
    variant: {
      primary: cn(
        "bg-foreground text-background font-medium border border-foreground",
        "hover:bg-foreground/90 active:text-rose-300 dark:active:text-rose-800"
      ),
      secondary: cn(
        "bg-secondary text-foreground font-medium border border-secondary",
        "hover:bg-secondary/90 active:text-rose-300 dark:active:text-rose-800"
      ),
      outlined: cn(
        "bg-transparent text-foreground font-medium border border-foreground",
        "hover:bg-foreground/10 active:bg-foreground/20 dark:active:bg-foreground/30"
      ),
      ghost: cn(
        "bg-transparent text-foreground/90 font-normal border border-transparent",
        "hover:bg-accent hover:border-accent"
      ),
      link: cn(
        "bg-transparent text-foreground/60 font-normal border border-transparent",
        "p-0 rounded-none block", // <-- resets the default styles for the link variant
        "hover:underline hover:text-foreground/80"
      ),
      destructive: cn(
        "bg-destructive text-background font-medium border border-destructive",
        "hover:bg-destructive/90 active:text-rose-300 dark:active:text-rose-800"
      ),
    },
    // button sizes go here
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-5 py-3",
      icon: "size-9 rounded-sm p-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof createButtonStylesheet> {
  asChild?: boolean;
  isLoading?: boolean;
}

/**
 * Button component.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" size="md" type="button">
 *   Click me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      type = "button",
      asChild = false,
      isLoading = false,
      ...props
    },
    forwardedRef
  ) => {
    const Element = asChild ? Slot : "button";

    return (
      <Element
        {...props}
        ref={forwardedRef}
        type={type}
        className={cn(
          createButtonStylesheet({ variant, size }),
          isLoading && "pointer-events-none cursor-wait",
          className
        )}
      >
        {isLoading ? (
          <div aria-label="Loading..." className="flex items-center gap-x-3">
            <Ping />
            <Ping className="delay-75" />
            <Ping className="delay-150" />
          </div>
        ) : (
          children
        )}
      </Element>
    );
  }
);
Button.displayName = "Button";
