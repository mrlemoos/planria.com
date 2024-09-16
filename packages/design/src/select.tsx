"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import * as SelectPrimitive from "@radix-ui/react-select";

import { cn } from "./css";
import { Icon } from "./icon";

export interface SelectProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {}

export const Select = SelectPrimitive.Root;

export interface SelectGroupProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Group> {}

export const SelectGroup = SelectPrimitive.Group;

export interface SelectValueProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Value> {}

export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {}

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, ...props }, forwardedRef) => (
  <SelectPrimitive.Trigger
    ref={forwardedRef}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon name="ChevronDown" size={18} aria-hidden="true" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export interface SelectScrollUpButtonProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> {}

export const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  SelectScrollUpButtonProps
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.ScrollUpButton
    ref={forwardedRef}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <Icon name="ChevronUp" size={18} aria-hidden="true" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = "SelectScrollUpButton";

export interface SelectScrollDownButtonProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> {}

export const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <Icon name="ChevronDown" size={18} aria-hidden="true" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = "SelectScrollDownButton";

export interface SelectContentProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Content> {}

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = "popper", ...props }, forwardedRef) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={forwardedRef}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

export interface SelectLabelProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Label> {}

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  SelectLabelProps
>(({ className, ...props }, forwardedRef) => (
  <SelectPrimitive.Label
    ref={forwardedRef}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

export interface SelectItemProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {}

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, ...props }, forwardedRef) => (
  <SelectPrimitive.Item
    ref={forwardedRef}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon name="Check" size={18} aria-hidden="true" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export interface SelectSeparatorProps
  extends ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> {}

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";
