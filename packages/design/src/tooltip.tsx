"use client";

import {
  forwardRef,
  type ComponentPropsWithRef,
  type ElementRef,
  type JSX,
  type LegacyRef,
} from "react";

import {
  Arrow as PrimitiveArrow,
  Content as PrimitiveContent,
  Provider as PrimitiveProvider,
  Root as PrimitiveRoot,
  Trigger as PrimitiveTrigger,
} from "@radix-ui/react-tooltip";

import { cn } from "./css";

export class TooltipVisibilityUpdateEvent {
  constructor(public readonly isOpen: boolean) {}
}

export interface TooltipProps
  extends Omit<
      ComponentPropsWithRef<typeof PrimitiveRoot>,
      "defaultOpen" | "open" | "onOpenChange"
    >,
    Pick<ComponentPropsWithRef<typeof PrimitiveProvider>, "skipDelayDuration"> {
  isOpen?: boolean;
  isDefaultOpen?: boolean;
  onVisibilityUpdate?: (event: TooltipVisibilityUpdateEvent) => void;
}

export function Tooltip({
  children,
  delayDuration,
  disableHoverableContent = false,
  isDefaultOpen,
  isOpen,
  onVisibilityUpdate,
  skipDelayDuration,
}: TooltipProps): JSX.Element {
  function handleOpenChange(open: boolean) {
    onVisibilityUpdate?.(new TooltipVisibilityUpdateEvent(open));
  }

  return (
    <PrimitiveProvider
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
      skipDelayDuration={skipDelayDuration}
    >
      <PrimitiveRoot
        delayDuration={delayDuration}
        disableHoverableContent={disableHoverableContent}
        open={isOpen}
        defaultOpen={isDefaultOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
      </PrimitiveRoot>
    </PrimitiveProvider>
  );
}

export interface TooltipTriggerProps
  extends ComponentPropsWithRef<typeof PrimitiveTrigger> {}

export const TooltipTrigger = forwardRef<
  ElementRef<typeof PrimitiveTrigger>,
  TooltipTriggerProps
>(({ children, className, ...props }, ref) => (
  <PrimitiveTrigger
    ref={ref as unknown as LegacyRef<HTMLButtonElement>}
    className={className}
    {...props}
  >
    {children}
  </PrimitiveTrigger>
));

export interface TooltipContentProps
  extends ComponentPropsWithRef<typeof PrimitiveContent> {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      side = "top",
      align = "center",
      sideOffset = 4,
      ...props
    },
    forwardedRef
  ) => (
    <PrimitiveContent
      ref={forwardedRef}
      sideOffset={sideOffset}
      side={side}
      align={align}
      className={cn(
        "z-50 overflow-hidden rounded-md border border-foreground/10 bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveContent>
  )
);

export interface TooltipArrowProps
  extends ComponentPropsWithRef<typeof PrimitiveArrow> {}

export const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  ({ children, className, width = 10, height = 8, ...props }, forwardedRef) => (
    <PrimitiveArrow
      width={width}
      height={height}
      ref={forwardedRef}
      className={cn(
        "bg-transparent [&>polygon]:stroke-zinc-500/30 [&>polygon]:fill-gray-300/80",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveArrow>
  )
);
