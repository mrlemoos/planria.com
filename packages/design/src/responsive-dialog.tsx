"use client";

// This responsive dialog is based on credenza.
// Big shout out to @redpangilinan for creating credenza:
// https://github.com/redpangilinan/credenza/

import { HTMLAttributes, type JSX, type ReactNode } from "react";

import { useMediaQuery } from "@planria/react-hooks/media";
import { DialogClose, type DialogCloseProps } from "@radix-ui/react-dialog";

import { cn } from "./css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose as OpiningDialogClose,
  type DialogDescriptionProps,
  type DialogHeaderProps,
  type DialogProps,
  type DialogTriggerProps,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerContentProps,
} from "./drawer";

export interface ResponsiveDialogProps
  extends Pick<DialogProps, "onVisibilityUpdate" | "variant"> {
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const desktop = "(min-width: 768px)";

export function ResponsiveDialog({
  children,
  ...props
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery(desktop);
  const Credenza = isDesktop ? Dialog : Drawer;

  return (
    <Credenza direction="top" {...props}>
      {children}
    </Credenza>
  );
}

export interface ResponsiveDialogTriggerProps extends DialogTriggerProps {}

export function ResponsiveDialogTrigger({
  className,
  children,
  ...props
}: ResponsiveDialogCloseProps) {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <CredenzaTrigger className={className} {...props}>
      {children}
    </CredenzaTrigger>
  );
}

export interface ResponsiveDialogCloseProps extends DialogCloseProps {}

export function ResponsiveDialogClose({
  className,
  children,
  ...props
}: ResponsiveDialogCloseProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaClose = isDesktop ? DialogClose : DrawerClose;

  if (isDesktop && typeof children === "undefined") {
    return <OpiningDialogClose />;
  }

  return (
    <CredenzaClose className={className} {...props}>
      {children}
    </CredenzaClose>
  );
}

export interface ResponseDialogContentProps
  // extends DrawerContentProps because Drawer instantiates its props from Dialog so the type suffers
  // from overlapping if we directly extend DialogContentProps
  extends DrawerContentProps {}

export function ResponsiveDialogContent({
  className,
  children,
  ...props
}: ResponseDialogContentProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <CredenzaContent className={className} {...props}>
      {children}
    </CredenzaContent>
  );
}

export interface ResponsiveDialogDescriptionProps
  extends DialogDescriptionProps {}

export function ResponsiveDialogDescription({
  className,
  children,
  ...props
}: ResponsiveDialogDescriptionProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaDescription = isDesktop ? DialogDescription : DrawerDescription;

  return (
    <CredenzaDescription className={className} {...props}>
      {children}
    </CredenzaDescription>
  );
}

export interface ResponsiveDialogHeaderProps extends DialogHeaderProps {}

export function ResponsiveDialogHeader({
  className,
  children,
  ...props
}: ResponsiveDialogHeaderProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <CredenzaHeader className={className} {...props}>
      {children}
    </CredenzaHeader>
  );
}

export interface ResponsiveDialogTitleProps extends DialogHeaderProps {}

export function ResponsiveDialogTitle({
  className,
  children,
  ...props
}: ResponsiveDialogTitleProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <CredenzaTitle className={className} {...props}>
      {children}
    </CredenzaTitle>
  );
}

export interface ResponsiveDialogBodyProps
  extends HTMLAttributes<HTMLDivElement> {}

export function ResponsiveDialogBody({
  className,
  children,
  ...props
}: ResponsiveDialogBodyProps) {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
}

export interface ResponsiveDialogFooterProps
  extends HTMLAttributes<HTMLDivElement> {}

export function ResponsiveDialogFooter({
  className,
  children,
  ...props
}: ResponsiveDialogFooterProps): JSX.Element {
  const isDesktop = useMediaQuery(desktop);
  const CredenzaFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <CredenzaFooter className={className} {...props}>
      {children}
    </CredenzaFooter>
  );
}
