import type { JSX } from "react";

import { cn } from "@planria/design/css";

import { fontMono } from "$/lib/styles/fonts";

export function BreakpointMarker(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed left-5 bottom-5 bg-background text-foreground backdrop-blur-md rounded-md border border-zinc-200 dark:border-zinc-800 p-3 shadow-xl",
        fontMono
      )}
    >
      <div className="flex items-center gap-1">
        <span className="text-sm">Breakpoint</span>
        <div className="flex flex-col font-mono [&>div]:text-rose-500 text-sm">
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
            sm
          </div>
          <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
            md
          </div>
          <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
            lg
          </div>
          <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
            xl
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
            2xl
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
            3xl
          </div>
        </div>
      </div>
    </div>
  );
}
