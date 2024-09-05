import type { HTMLAttributes, JSX } from "react";

import { cn, stylesheet, type VariantProps } from "./css";

export const createBadgeVariants = stylesheet.create({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      primary:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary:
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
      success:
        "border-transparent bg-success-background text-success-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof createBadgeVariants> {}

export function Badge({
  className,
  variant,
  ...props
}: BadgeProps): JSX.Element {
  return (
    <div
      className={cn(createBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}
