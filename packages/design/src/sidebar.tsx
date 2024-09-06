"use client";

import {
  ComponentPropsWithoutRef,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type JSX,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

import { Button, type ButtonProps } from "./button";
import { cn } from "./css";
import { Icon } from "./icon";

export interface SidebarContextType {
  isOpen: boolean;
  toggle(): void;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);

export interface SidebarProviderProps extends SidebarContextType {
  children: ReactNode;
}

function SidebarProvider({
  isOpen,
  toggle,
  children,
}: SidebarProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(
    () => ({ isOpen, toggle }),
    [isOpen, toggle]
  );

  return (
    <SidebarContext.Provider value={memoizedContextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);

  if (context === null) {
    throw new Error(
      "The useSidebar was called but the host component is not within the SidebarProvider."
    );
  }

  return context;
}

export interface SidebarToggleProps extends Omit<ButtonProps, "children"> {}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  (
    { variant = "secondary", size = "icon", className, onClick },
    forwardedRef
  ) => {
    const { isOpen, toggle } = useSidebar();

    function handleToggleSidebar(event: ReactMouseEvent<HTMLButtonElement>) {
      toggle();
      onClick?.(event);
    }

    return (
      <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
        <Button
          ref={forwardedRef}
          variant={variant}
          size={size}
          className={cn("rounded-md size-8", className)}
          onClick={handleToggleSidebar}
        >
          <Icon
            name="ChevronLeft"
            size={16}
            className={cn(
              "size-4 transition-transform ease-in-out duration-700",
              isOpen ? "rotate-0" : "rotate-180"
            )}
          />
        </Button>
      </div>
    );
  }
);

export interface SideBarProps
  extends ComponentPropsWithoutRef<"aside">,
    SidebarContextType {}

export function SideBar({
  children,
  className,
  isOpen,
  toggle,
  ...props
}: SideBarProps): JSX.Element {
  return (
    <SidebarProvider isOpen={isOpen} toggle={toggle}>
      <aside
        {...props}
        className={cn(
          "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-background text-foreground",
          isOpen ? "w-60" : "w-[90px]",
          className
        )}
      >
        {children}
      </aside>
    </SidebarProvider>
  );
}

export interface SideBarContentProps extends ComponentPropsWithoutRef<"div"> {}

export function SideBarContent({
  children,
  className,
  ...props
}: SideBarContentProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface SideBarItemProps extends ButtonProps {}

export const SideBarItem = forwardRef<HTMLButtonElement, SideBarItemProps>(
  (
    { children, className, variant = "link", size = "sm", ...props },
    forwardedRef
  ) => {
    const { isOpen } = useSidebar();

    return (
      <Button
        ref={forwardedRef}
        variant={variant}
        size={size}
        {...props}
        className={cn(
          "flex items-center gap-1",
          "transition-transform ease-in-out duration-300 mb-1",
          isOpen ? "translate-x-0" : "translate-x-1",
          className
        )}
      >
        {children}
      </Button>
    );
  }
);

export interface SideBarItemLabelProps
  extends ComponentPropsWithoutRef<"span"> {}

export function SideBarItemLabel({
  children,
  className,
  ...props
}: SideBarItemLabelProps): JSX.Element {
  const { isOpen } = useSidebar();

  return (
    <span
      {...props}
      className={cn(
        "text-sm font-medium text-foreground whitespace-nowrap translate-[transform,opacity,display] ease-in-out duration-300",
        isOpen
          ? "translate-x-0 opacity-100"
          : "-translate-x-96 opacity-0 hidden"
      )}
    >
      {children}
    </span>
  );
}
