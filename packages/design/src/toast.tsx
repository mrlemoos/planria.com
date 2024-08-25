"use client";

import {
  ReactNode,
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type JSX,
  type ReactElement,
} from "react";

import * as ToastPrimitives from "@radix-ui/react-toast";

import { TOAST_LIMIT, TOAST_REMOVE_DELAY } from "./constants";
import { cn, stylesheet, type VariantProps } from "./css";

export const ToastProvider = ToastPrimitives.Provider;

export interface ToastViewportProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> {}

export const ToastViewport = forwardRef<
  ElementRef<typeof ToastPrimitives.Viewport>,
  ToastViewportProps
>(({ className, ...props }, forwardedRef) => (
  <ToastPrimitives.Viewport
    ref={forwardedRef}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = stylesheet.create({
  base: "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  variants: {
    variant: {
      coherent: "border bg-background text-foreground",
      destructive:
        "destructive group border-destructive bg-destructive text-destructive-foreground",
    },
  },
  defaultVariants: {
    variant: "coherent",
  },
});

export interface ToastProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = forwardRef<
  ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, ...props }, forwardedRef) => {
  return (
    <ToastPrimitives.Root
      ref={forwardedRef}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

export interface ToastActionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Action> {}

export const ToastAction = forwardRef<
  ElementRef<typeof ToastPrimitives.Action>,
  ToastActionProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = "ToastAction";

export interface ToastCloseProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Close> {}

export const ToastClose = forwardRef<
  ElementRef<typeof ToastPrimitives.Close>,
  ToastCloseProps
>(({ className, ...props }, forwardedRef) => (
  <ToastPrimitives.Close
    ref={forwardedRef}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    {/* <Icon name='' className="h-4 w-4" /> */}
  </ToastPrimitives.Close>
));
ToastClose.displayName = "ToastClose";

export interface ToastTitleProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Title> {}

export const ToastTitle = forwardRef<
  ElementRef<typeof ToastPrimitives.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = "ToastTitle";

export interface ToastDescriptionProps
  extends ComponentPropsWithoutRef<typeof ToastPrimitives.Description> {}

export const ToastDescription = forwardRef<
  ElementRef<typeof ToastPrimitives.Description>,
  ToastDescriptionProps
>(({ className, ...props }, forwardedRef) => (
  <ToastPrimitives.Description
    ref={forwardedRef}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = "ToastDescription";

export type ToastPayload = ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = ReactElement<typeof ToastAction>;

// Inspired by react-hot-toast library

type HotToastPayload = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ToastReducerActionType = typeof actionTypes;

type ToastReducerAction =
  | {
      type: ToastReducerActionType["ADD_TOAST"];
      toast: HotToastPayload;
    }
  | {
      type: ToastReducerActionType["UPDATE_TOAST"];
      toast: Partial<HotToastPayload>;
    }
  | {
      type: ToastReducerActionType["DISMISS_TOAST"];
      toastId?: HotToastPayload["id"];
    }
  | {
      type: ToastReducerActionType["REMOVE_TOAST"];
      toastId?: HotToastPayload["id"];
    };

interface ToastReducerState {
  toasts: HotToastPayload[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatchToastAction({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
}

function createToastReducer(
  state: ToastReducerState,
  action: ToastReducerAction
): ToastReducerState {
  switch (action.type) {
    case "ADD_TOAST": {
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    }

    case "UPDATE_TOAST": {
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    }

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST": {
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default: {
      return state;
    }
  }
}

const listeners: ((state: ToastReducerState) => void)[] = [];

let memoryState: ToastReducerState = { toasts: [] };

function dispatchToastAction(action: ToastReducerAction) {
  memoryState = createToastReducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * Displays a toast notification with the provided props.
 *
 * @param props The props for the toast notification.
 * @returns An object containing the toast ID, dismiss function, and update function.
 */
export function toast({ ...props }: Omit<HotToastPayload, "id">) {
  const id = genId();

  /**
   * Updates the toast with the provided properties.
   *
   * @param props The properties to update the toast with.
   */
  function update(props: Omit<HotToastPayload, "id">) {
    return dispatchToastAction({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  }
  /**
   * Dismisses the toast with the specified ID.
   */
  function dismiss() {
    return dispatchToastAction({ type: "DISMISS_TOAST", toastId: id });
  }

  dispatchToastAction({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange(open) {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

/**
 * Custom hook for managing toast notifications.
 *
 * @returns An object containing the toast state and methods for displaying and dismissing toasts.
 */
export function useToast() {
  const [state, setState] = useState<ToastReducerState>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss(toastId?: string) {
      dispatchToastAction({ type: "DISMISS_TOAST", toastId });
    },
  };
}

/**
 * This component is responsible for rendering the toasts using the ToastProvider.
 * It retrieves the toasts from the useToast hook and maps them to individual Toast components.
 * Each Toast component displays the title, description, action, and a close button.
 * Finally, it renders the ToastViewport component to display the toasts.
 */
export function ToastController(): JSX.Element {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
