"use client";

import type { ComponentPropsWithoutRef } from "react";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export interface CollapsibleProps
  extends ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {}

export const Collapsible = CollapsiblePrimitive.Root;

export interface CollapsibleTriggerProps
  extends ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.CollapsibleTrigger
  > {}

export const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

export interface CollapsibleContentProps
  extends ComponentPropsWithoutRef<
    typeof CollapsiblePrimitive.CollapsibleContent
  > {}

export const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;
