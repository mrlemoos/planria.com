"use client";

import { forwardRef, type ElementRef } from "react";

import {
  NavigationBarItem,
  type NavigationBarItemProps,
} from "@planria/design/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface EnvironmentsAnchorProps
  extends Omit<NavigationBarItemProps, "children" | "asChild"> {}

export const EnvironmentsAnchor = forwardRef<
  ElementRef<typeof Link>,
  EnvironmentsAnchorProps
>((props, forwardedRef) => {
  const params = useParams<{ projectId?: string }>();

  if (!params.projectId) {
    return null;
  }

  return (
    <NavigationBarItem {...props} asChild={true}>
      <Link
        href={`/projects/${params.projectId}/environments`}
        ref={forwardedRef}
      >
        Environments
      </Link>
    </NavigationBarItem>
  );
});
EnvironmentsAnchor.displayName = "EnvironmentsAnchor";
