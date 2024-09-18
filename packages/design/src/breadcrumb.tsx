"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
} from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "./css";
import { Icon } from "./icon";

export interface BreadcrumbProps extends ComponentPropsWithoutRef<"nav"> {
  separator?: ReactNode;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, forwardedRef) => (
    <nav ref={forwardedRef} aria-label="breadcrumb" {...props} />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbListProps extends ComponentPropsWithoutRef<"ol"> {}

export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, forwardedRef) => (
    <ol
      ref={forwardedRef}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
);
BreadcrumbList.displayName = "BreadcrumbList";

export interface BreadcrumbItemProps extends ComponentPropsWithoutRef<"li"> {}

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, forwardedRef) => (
    <li
      ref={forwardedRef}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

export const BreadcrumbLink = forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ asChild, className, ...props }, forwardedRef) => {
  const Element = asChild ? Slot : "a";

  return (
    <Element
      ref={forwardedRef}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export interface BreadcrumbPageProps extends ComponentPropsWithoutRef<"span"> {}

export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";

export interface BreadcrumbSeparatorProps
  extends ComponentPropsWithoutRef<"li"> {}

export function BreadcrumbSeparator({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <Icon name="ChevronRight" size={16} />}
    </li>
  );
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export interface BreadcrumbEllipsisProps
  extends ComponentPropsWithoutRef<"span"> {}

export function BreadcrumbEllipsis({
  className,
  ...props
}: BreadcrumbEllipsisProps): JSX.Element {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <Icon name="DotsHorizontal" size={16} className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
