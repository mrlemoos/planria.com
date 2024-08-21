import type { HTMLAttributes, JSX } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn, stylesheet, type VariantProps } from "./css";

export const createLogoStylesheet = stylesheet.create({
  base: cn(
    "bg-foreground text-background flex items-center justify-center pointer-events-none select-none"
  ),
  variants: {
    shape: {
      circle: cn("rounded-full"),
      round: cn("rounded-md"),
    },
    size: {
      sm: cn("size-6 text-base font-light"),
      md: cn("size-8 text-lg font-normal"),
      lg: cn("size-10 text-xl font-medium"),
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

export interface LogoProps
  extends Omit<HTMLAttributes<HTMLElement>, "children">,
    VariantProps<typeof createLogoStylesheet> {
  asChild?: boolean;
}

export function Logo({
  className,
  shape,
  size,
  asChild = false,
  ...props
}: LogoProps): JSX.Element {
  const Element = asChild ? Slot : "div";

  return (
    <Element {...props} className={cn(createLogoStylesheet({ shape, size }))}>
      p
    </Element>
  );
}
