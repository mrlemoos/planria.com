"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ComponentPropsWithRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";

import {
  Arrow as PrimitiveArrow,
  CheckboxItem as PrimitiveCheckboxItem,
  Content as PrimitiveContent,
  Group as PrimitiveGroup,
  Item as PrimitiveItem,
  ItemIndicator as PrimitiveItemIndicator,
  Label as PrimitiveLabel,
  Sub as PrimitiveNested,
  SubContent as PrimitiveNestedContent,
  SubTrigger as PrimitiveNestedTrigger,
  Portal as PrimitivePortal,
  RadioGroup as PrimitiveRadioGroup,
  RadioItem as PrimitiveRadioItem,
  Root as PrimitiveRoot,
  Separator as PrimitiveSeparator,
  Trigger as PrimitiveTrigger,
} from "@radix-ui/react-dropdown-menu";

import { cn } from "./css";
import { Icon } from "./icon";

export type DropdownMenuSide = "top" | "right" | "bottom" | "left";
export type DropdownMenuAlignment = "start" | "center" | "end";

export type DropdownMenuPosition =
  `${DropdownMenuSide}-${DropdownMenuAlignment}`;

interface DropdownMenuContextType {
  position: DropdownMenuPosition;
  offset?: number;
  gap?: number;
}

const DropdownMenuContext = createContext<DropdownMenuContextType | null>(null);

interface DropdownMenuProviderProps extends DropdownMenuContextType {
  children: ReactNode;
}

function DropdownMenuProvider({
  children,
  ...props
}: DropdownMenuProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(() => ({ ...props }), [props]);

  return (
    <DropdownMenuContext.Provider value={memoizedContextValue}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function useDropdownMenuContext(): DropdownMenuContextType {
  const contextValue = useContext(DropdownMenuContext);

  if (contextValue === null) {
    throw new Error(
      "The DropdownMenuContext cannot be accessed if the dispatcher component is not rendered within the <DropdownMenuProvider /> component. Please ensure that the dispatcher component invoking the useDropdownMenuContext() is within the <DropdownMenuProvider /> component."
    );
  }

  return contextValue;
}

export class DropdownMenuVisibilityEvent {
  public constructor(public readonly isVisible: boolean) {}
}

export interface DropdownMenuProps extends DropdownMenuContextType {
  children: ReactNode;
  variant?: "modal" | "dismissable";
  onVisibilityChange?: (event: DropdownMenuVisibilityEvent) => void;
  isOpen?: boolean;
}

export function DropdownMenu({
  children,
  position,
  offset = 0,
  gap = 4,
  variant = "dismissable",
  onVisibilityChange,
  isOpen,
}: DropdownMenuProps): JSX.Element {
  function handleOpenChange(isOpen: boolean) {
    onVisibilityChange?.(new DropdownMenuVisibilityEvent(isOpen));
  }

  return (
    <DropdownMenuProvider position={position} gap={gap} offset={offset}>
      <PrimitiveRoot
        modal={variant === "modal"}
        onOpenChange={handleOpenChange}
        open={isOpen}
      >
        {children}
      </PrimitiveRoot>
    </DropdownMenuProvider>
  );
}

export interface DropdownMenuTriggerProps
  extends ComponentPropsWithRef<typeof PrimitiveTrigger> {}

export const DropdownMenuTrigger = PrimitiveTrigger;

export interface DropdownMenuGroupProps
  extends ComponentPropsWithRef<typeof PrimitiveGroup> {}

export const DropdownMenuGroup = PrimitiveGroup;

export interface DropdownMenuPortalProps
  extends ComponentPropsWithRef<typeof PrimitivePortal> {}

export const DropdownMenuPortal = PrimitivePortal;

export interface DropdownMenuNestedRootProps
  extends ComponentPropsWithRef<typeof PrimitiveNested> {}

export const DropdownMenuNestedRoot = PrimitiveNested;

export interface DropdownMenuRadioGroupProps
  extends ComponentPropsWithRef<typeof PrimitiveRadioGroup> {}

export const DropdownMenuRadioGroup = PrimitiveRadioGroup;

export interface DropdownMenuNestedTriggerProps
  extends ComponentPropsWithRef<typeof PrimitiveNestedTrigger> {
  inset?: boolean;
}

export function DropdownMenuNestedTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: DropdownMenuNestedTriggerProps): JSX.Element {
  return (
    <PrimitiveNestedTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <Icon
        name="ChevronRight"
        className="ml-auto h-4 w-4"
        aria-hidden="true"
      />
    </PrimitiveNestedTrigger>
  );
}
DropdownMenuNestedTrigger.displayName = "DropdownMenuNestedTrigger";

export interface DropdownMenuNestedContentProps
  extends ComponentPropsWithRef<typeof PrimitiveNestedContent> {}

export function DropdownMenuNestedContent({
  className,
  ref,
  ...props
}: DropdownMenuNestedContentProps): JSX.Element {
  return (
    <PrimitiveNestedContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  );
}
DropdownMenuNestedContent.displayName = "DropdownMenuNestedContent";

export interface DropdownMenuContentProps
  extends Omit<
    ComponentPropsWithRef<typeof PrimitiveContent>,
    "side" | "align" | "sideOffset" | "alignOffset"
  > {}

export function DropdownMenuContent({
  children,
  className,
  ref,
  ...props
}: DropdownMenuContentProps): JSX.Element {
  const { position, gap, offset } = useDropdownMenuContext();

  const { side, align } = useMemo(() => {
    const [side, align] = position.split("-") as [
      DropdownMenuSide,
      DropdownMenuAlignment
    ];

    return {
      side,
      align,
    };
  }, [position]);

  return (
    <PrimitivePortal>
      <PrimitiveContent
        ref={ref}
        sideOffset={gap}
        alignOffset={offset}
        side={side}
        align={align}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-zinc-50 dark:border-zinc-900",
          className
        )}
        {...props}
      >
        {children}
        <PrimitiveArrow className="absolute w-4 h-4 fill-foreground/10" />
      </PrimitiveContent>
    </PrimitivePortal>
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps
  extends ComponentPropsWithRef<typeof PrimitiveItem> {
  inset?: boolean;
}

export function DropdownMenuItem({
  className,
  ref,
  inset,
  ...props
}: DropdownMenuItemProps): JSX.Element {
  return (
    <PrimitiveItem
      ref={ref}
      className={cn(
        "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer border border-zinc-100 dark:border-zinc-900",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}
DropdownMenuItem.displayName = "DropdownMenuItem";

export interface DropdownMenuCheckboxItemProps
  extends ComponentPropsWithRef<typeof PrimitiveCheckboxItem> {}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ref,
  checked,
  ...props
}: DropdownMenuCheckboxItemProps): JSX.Element {
  return (
    <PrimitiveCheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <PrimitiveItemIndicator>
          <Icon name="Check" className="h-4 w-4" aria-hidden="true" />
        </PrimitiveItemIndicator>
      </span>
      {children}
    </PrimitiveCheckboxItem>
  );
}
DropdownMenuCheckboxItem.displayName = PrimitiveCheckboxItem.displayName;

export interface DropdownMenuRadioItemProps
  extends ComponentPropsWithRef<typeof PrimitiveRadioItem> {}

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: DropdownMenuRadioItemProps): JSX.Element {
  return (
    <PrimitiveRadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <PrimitiveItemIndicator>
          <Icon name="Circle" className="h-2 w-2 fill-current" />
        </PrimitiveItemIndicator>
      </span>
      {children}
    </PrimitiveRadioItem>
  );
}
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export interface DropdownMenuLabelProps
  extends ComponentPropsWithRef<typeof PrimitiveLabel> {
  inset?: boolean;
}

export function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuLabelProps): JSX.Element {
  return (
    <PrimitiveLabel
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export interface DropdownMenuSeparatorProps
  extends ComponentPropsWithRef<typeof PrimitiveSeparator> {}

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps): JSX.Element {
  return (
    <PrimitiveSeparator
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-muted dark:bg-zinc-800", className)}
      {...props}
    />
  );
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export interface DropdownMenuShortcutProps
  extends HTMLAttributes<HTMLSpanElement> {}

function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps): JSX.Element {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
