"use client";

import type { CSSProperties, HTMLAttributes, JSX } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "./css";

export interface BorderBeamProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  asChild?: boolean;
}

// https://nyxbui.design/docs/components/border-beam

export function BorderBeam({
  className,
  children,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#e11d48",
  colorTo = "#343434",
  delay = 0,
  asChild,
  ...props
}: BorderBeamProps): JSX.Element {
  const Element = asChild ? Slot : "div";

  return (
    <Element
      {...props}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",

        // mask styles
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",

        // pseudo styles
        "after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className
      )}
    />
  );
}
