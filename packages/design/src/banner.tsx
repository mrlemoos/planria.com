"use client";

import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  JSX,
  ReactNode,
} from "react";

import { cn } from "./css";
import { Icon, type IconProps } from "./icon";
import { Slot } from "./slot";

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Banner({
  children,
  className,
  role = "banner",
  ...props
}: BannerProps): JSX.Element {
  return (
    <section
      {...props}
      role={role}
      className={cn(
        "w-full px-8 py-4 bg-foreground text-background flex items-center gap-0.5 cursor-pointer hover:gap-1.5 transition-all",
        className
      )}
    >
      {children}
    </section>
  );
}

export interface BannerTextProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export function BannerText({
  children,
  className,
  asChild = false,
  ...props
}: BannerTextProps): JSX.Element {
  const RootElement = asChild ? Slot : "span";
  return (
    <RootElement {...props} className={cn("font-medium", className)}>
      {children}
    </RootElement>
  );
}

export interface BannerChevronProps extends Omit<IconProps, "name"> {}

export function BannerChevron({
  size = 16,
  ...props
}: BannerChevronProps): JSX.Element {
  return <Icon name="ChevronRight" size={size} {...props} />;
}
