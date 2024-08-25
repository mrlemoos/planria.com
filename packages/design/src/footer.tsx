"use client";

import type { HTMLAttributes, JSX } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "./css";
import { Logo } from "./logo";

export interface FooterProps extends HTMLAttributes<HTMLElement> {}

export function Footer({
  children,
  className,
  ...props
}: FooterProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "border-t dark:border-t-zinc-900 border-t-zinc-100 dark:bg-zinc-950 bg-zinc-50 min-h-96 full text-foreground p-4 sm:p-6 md:p-8",
        className
      )}
    >
      <footer className="container mx-auto">
        <div className="flex flex-col items-center gap-3">{children}</div>
      </footer>
    </div>
  );
}

export interface FooterSectionProps extends HTMLAttributes<HTMLElement> {}

export function FooterSection({
  children,
  className,
  ...props
}: FooterSectionProps): JSX.Element {
  return (
    <section {...props} className={cn("flex flex-col", className)}>
      {children}
    </section>
  );
}

export interface FooterProductLogoProps extends HTMLAttributes<HTMLElement> {}

export function FooterProductLogo({
  className,
  children,
  ...props
}: FooterProductLogoProps): JSX.Element {
  return (
    <div className="flex flex-col gap-0.5 items-center border-b-2 pb-1.5 px-5 border-b-zinc-200 dark:border-b-zinc-800 select-none pointer-events-none">
      <Logo
        {...props}
        shape="round"
        size="md"
        variant="outlined"
        className={cn(className)}
      />
      {children}
    </div>
  );
}

export function FooterContentWrapper({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  return (
    <div className="flex gap-4 sm:gap-6 md:gap-12 lg:gap-24 items-center justify-center [&>div]:flex [&>div]:flex-col [&>div]:items-center">
      {children}
    </div>
  );
}

export interface FooterActionProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function FooterAction({
  children,
  className,
  asChild = false,
  ...props
}: FooterActionProps): JSX.Element {
  const Element = asChild ? Slot : "div"; // maybe not the cleverest thing to default it to a 'div' ...

  return (
    <Element {...props} className={cn("text-zinc-500", className)}>
      {children}
    </Element>
  );
}
