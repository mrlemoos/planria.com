import type { ButtonHTMLAttributes, HTMLAttributes, JSX } from "react";

import { Slot } from "@radix-ui/react-slot";

import { createButtonStylesheet } from "./button";
import { cn } from "./css";

export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {}

export function NavigationBar({
  children,
  className,
  ...props
}: NavigationBarProps): JSX.Element {
  return (
    <nav {...props} className={cn("flex items-center gap-3", className)}>
      {children}
    </nav>
  );
}

export interface NavigationBarLinkProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  asChild?: boolean;
}

export function NavigationBarItem({
  children,
  className,
  asChild = false,
  ...props
}: NavigationBarLinkProps): JSX.Element {
  const Element = asChild ? Slot : "button";

  return (
    <Element
      type="button"
      {...props}
      className={cn(
        createButtonStylesheet({ size: "sm", variant: "ghost" }),
        className
      )}
    >
      {children}
    </Element>
  );
}
