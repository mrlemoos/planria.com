"use client";

import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";

import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "./css";

const PrimitiveRoot = DrawerPrimitive.Root;
const PrimitiveTrigger = DrawerPrimitive.Trigger;
const PrimitivePortal = DrawerPrimitive.Portal;
const PrimitiveClose = DrawerPrimitive.Close;
const PrimitiveContent = DrawerPrimitive.Content;
const PrimitiveDescription = DrawerPrimitive.Description;
const PrimitiveTitle = DrawerPrimitive.Title;
const PrimitiveOverlay = DrawerPrimitive.Overlay;

export class DrawerVisibilityUpdateEvent {
  constructor(public readonly isVisible: boolean) {}
}

export interface DrawerProps {
  children: ReactNode;
  direction: "top" | "bottom" | "left" | "right";
  variant?: "modal" | "dismissable";
  isOpen?: boolean;
  onClose?: (event: DrawerVisibilityUpdateEvent) => void;
  onOpen?: (event: DrawerVisibilityUpdateEvent) => void;
}

export function Drawer({
  children,
  direction = "right",
  variant = "dismissable",
  onOpen,
  onClose,
  isOpen,
}: DrawerProps): JSX.Element {
  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        onOpen?.(new DrawerVisibilityUpdateEvent(true));
      } else {
        onClose?.(new DrawerVisibilityUpdateEvent(false));
      }
    },
    [onClose, onOpen]
  );

  return (
    <PrimitiveRoot
      shouldScaleBackground={true}
      direction={direction}
      modal={variant === "modal"}
      dismissible={variant === "dismissable"}
      onOpenChange={handleOpenChange}
      open={isOpen}
    >
      {children}
    </PrimitiveRoot>
  );
}
Drawer.displayName = "Drawer";

export interface DrawerTriggerProps
  extends ComponentPropsWithoutRef<typeof PrimitiveTrigger> {}

export const DrawerTrigger = PrimitiveTrigger;
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerPortal = PrimitivePortal;
DrawerPortal.displayName = "DrawerPortal";

export interface DrawerCloseProps
  extends ComponentPropsWithoutRef<typeof PrimitiveClose> {}

export function DrawerClose({
  children,
  className,
  "aria-label": ariaLabel = "Close",
  ...props
}: DrawerCloseProps): JSX.Element {
  return (
    <PrimitiveClose {...props} className={cn(className)} aria-label={ariaLabel}>
      {children}
    </PrimitiveClose>
  );
}
DrawerClose.displayName = "DrawerClose";

interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <PrimitiveOverlay asChild={true} forceMount={true}>
      <div
        {...props}
        ref={forwardedRef}
        className={cn(
          "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
          className
        )}
      >
        {children}
      </div>
    </PrimitiveOverlay>
  )
);
DrawerOverlay.displayName = "DrawerOverlay";

export interface DrawerContentProps
  extends ComponentPropsWithoutRef<typeof PrimitiveContent> {}

export const DrawerContent = forwardRef<
  ElementRef<typeof PrimitiveContent>,
  DrawerContentProps
>(({ className, children, ...props }, forwardRef) => (
  <DrawerPortal>
    <DrawerOverlay />
    <PrimitiveContent
      ref={forwardRef}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </PrimitiveContent>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({
  children,
  className,
  ...props
}: DrawerHeaderProps) {
  return (
    <div
      {...props}
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    >
      {children}
    </div>
  );
}
DrawerHeader.displayName = "DrawerHeader";

export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    >
      {children}
    </div>
  );
}
DrawerFooter.displayName = "DrawerFooter";

export interface DrawerTitleProps
  extends ComponentPropsWithoutRef<typeof PrimitiveTitle> {}

export const DrawerTitle = forwardRef<
  ElementRef<typeof DrawerPrimitive.Title>,
  DrawerTitleProps
>(({ children, className, ...props }, forwardedRef) => (
  <DrawerPrimitive.Title
    {...props}
    ref={forwardedRef}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
  >
    {children}
  </DrawerPrimitive.Title>
));
DrawerTitle.displayName = "DrawerTitle";

export interface DrawerDescriptionProps
  extends ComponentPropsWithoutRef<typeof PrimitiveDescription> {}

export const DrawerDescription = forwardRef<
  ElementRef<typeof PrimitiveDescription>,
  DrawerDescriptionProps
>(({ children, className, ...props }, forwardedRef) => (
  <PrimitiveDescription
    {...props}
    ref={forwardedRef}
    className={cn("text-sm text-muted-foreground", className)}
  >
    {children}
  </PrimitiveDescription>
));
DrawerDescription.displayName = "DrawerDescription";
