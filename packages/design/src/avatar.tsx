"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { VariantProps, cn, stylesheet } from "./css";

export const createAvatarStyles = stylesheet.create({
  base: "relative flex shrink-0 overflow-hidden rounded-full",
  variants: {
    size: {
      sm: "size-8",
      md: "size-9",
      lg: "size-10",
    },
  },
});

export interface AvatarProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof createAvatarStyles> {}

export const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, forwardedRef) => (
  <AvatarPrimitive.Root
    ref={forwardedRef}
    className={cn(
      createAvatarStyles({ size }),
      "relative flex shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

export interface AvatarImageProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export const AvatarImage = forwardRef<
  ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, forwardedRef) => (
  <AvatarPrimitive.Image
    ref={forwardedRef}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

export interface AvatarFallbackProps
  extends ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {}

export const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, forwardedRef) => (
  <AvatarPrimitive.Fallback
    ref={forwardedRef}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";
