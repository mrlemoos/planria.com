"use client";

import {
  Fragment,
  createContext,
  forwardRef,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";

import { useBackdropWheelPreventionEffect } from "@planria/react-hooks/scroll";
import {
  Close as PrimitiveClose,
  Content as PrimitiveContent,
  Description as PrimitiveDescription,
  Overlay as PrimitiveOverlay,
  Portal as PrimitivePortal,
  Root as PrimitiveRoot,
  Title as PrimitiveTitle,
  Trigger as PrimitiveTrigger,
} from "@radix-ui/react-dialog";

import { cn } from "./css";
import { Icon } from "./icon";

export class DialogVisibilityUpdateEvent {
  constructor(public readonly isOpen: boolean) {}
}

export interface DialogContextValue {
  onVisibilityUpdate?: (event: DialogVisibilityUpdateEvent) => void;
  isOpen?: boolean;
  variant: "modal" | "dismissable";
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export interface DialogProviderProps extends DialogContextValue {
  children: ReactNode;
}

export function DialogProvider({
  children,
  ...props
}: DialogProviderProps): JSX.Element {
  const memoizedValue = useMemo(() => ({ ...props }), [props]);

  return (
    <DialogContext.Provider value={memoizedValue}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "The DialogContext cannot be accessed because the component calling it is not a descendant of the <DialogProvider />. Please review the call of the useDialogContext() hook and make sure it is wrapped by the <DialogProvider />."
    );
  }

  return context;
}

export interface DialogProps
  extends Pick<
    DialogContextValue,
    "variant" | "onVisibilityUpdate" | "isOpen"
  > {
  children: ReactNode;
}

export function Dialog({
  children,
  variant = "modal",
  onVisibilityUpdate,
  isOpen,
}: DialogProps): JSX.Element {
  const [isWheelingPrevented, setWheelPrevention] = useState(false);

  useBackdropWheelPreventionEffect(isWheelingPrevented);

  function handleOpenChange(isOpen: boolean) {
    if (typeof onVisibilityUpdate !== "function") {
      return;
    }

    onVisibilityUpdate(new DialogVisibilityUpdateEvent(isOpen));
    setWheelPrevention(isOpen);
  }

  return (
    <DialogProvider
      variant={variant}
      isOpen={isOpen}
      onVisibilityUpdate={onVisibilityUpdate}
    >
      <PrimitiveRoot
        modal={variant === "modal"}
        onOpenChange={handleOpenChange}
        open={isOpen}
      >
        {children}
      </PrimitiveRoot>
    </DialogProvider>
  );
}

export interface DialogTriggerProps
  extends ComponentPropsWithoutRef<typeof PrimitiveTrigger> {}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <PrimitiveTrigger ref={forwardedRef} {...props} className={cn(className)}>
        {children}
      </PrimitiveTrigger>
    );
  }
);

export interface DialogOverlayProps
  extends ComponentPropsWithoutRef<typeof PrimitiveOverlay> {}

export const DialogOverlay = forwardRef<
  ElementRef<typeof PrimitiveOverlay>,
  DialogOverlayProps
>(({ children, className, ...props }, forwardedRef) => (
  <Fragment>
    <PrimitiveOverlay ref={forwardedRef} className={cn(className)} {...props}>
      {children}
    </PrimitiveOverlay>
    <div
      className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 backdrop-blur-sm"
      aria-hidden="true"
    />
  </Fragment>
));
DialogOverlay.displayName = "DialogOverlay";

export interface DialogCloseProps
  extends ComponentPropsWithoutRef<typeof PrimitiveClose> {}

export const DialogClose = forwardRef<
  ElementRef<typeof PrimitiveClose>,
  DialogCloseProps
>(({ children, className, ...props }, forwardedRef) => {
  const { variant } = useDialogContext();

  if (variant !== "dismissable") {
    return null;
  }

  return (
    <PrimitiveClose
      {...props}
      ref={forwardedRef}
      className={cn(
        "absolute right-4 top-4 rounded-full opacity-70 transition-opacity hover:opacity-100 dark:hover:text-red-100 hover:text-red-600 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground border border-zinc-500 p-2",
        className
      )}
    >
      <Icon name="Cross2" className="size-5" aria-hidden="true" />
      <span className="sr-only">Close</span>
      {children}
    </PrimitiveClose>
  );
});
DialogClose.displayName = "DialogClose";

export interface DialogContentProps
  extends ComponentPropsWithoutRef<typeof PrimitiveContent> {}

export const DialogContent = forwardRef<
  ElementRef<typeof PrimitiveContent>,
  DialogContentProps
>(({ className, children, ...props }, forwardedRef) => (
  <PrimitivePortal>
    <DialogOverlay />
    <PrimitiveContent
      ref={forwardedRef}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid max-w-[min(90dvh,_568px)] translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-100 dark:border-zinc-900 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl",
        className
      )}
      {...props}
    >
      {children}
    </PrimitiveContent>
  </PrimitivePortal>
));
DialogContent.displayName = "DialogContent";

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export function DialogHeader({
  children,
  className,
  ...props
}: DialogHeaderProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DialogHeader.displayName = "DialogHeader";

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export function DialogFooter({
  children,
  className,
  ...props
}: DialogFooterProps): JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DialogFooter.displayName = "DialogFooter";

export interface DialogTitleProps
  extends ComponentPropsWithoutRef<typeof PrimitiveTitle> {}

export const DialogTitle = forwardRef<
  ElementRef<typeof PrimitiveTitle>,
  DialogTitleProps
>(({ className, ...props }, forwardedRef) => (
  <PrimitiveTitle
    ref={forwardedRef}
    className={cn("text-xl font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export interface DialogDescriptionProps
  extends ComponentPropsWithoutRef<typeof PrimitiveDescription> {}

export const DialogDescription = forwardRef<
  ElementRef<typeof PrimitiveDescription>,
  DialogDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <PrimitiveDescription
    ref={forwardedRef}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";
