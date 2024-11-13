import type { JSX } from "react";

import { cn } from "@planria/design/css";

import { fontMono } from "$/lib/styles/fonts";
import { env } from "$/server/env";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";

export function BreakpointMarker(): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "z-50 fixed bottom-20 left-1/2 -translate-x-1/2 bg-background py-3 px-8 rounded-full shadow-md border-2 border-gray-500/50",
        fontMono
      )}
    >
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground pr-3 border-r border-r-gray-500/50">
          <span className="text-sm">
            {`${env("NODE_ENV") === "development" ? "Dev" : "Preview"} Mode`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-base text-foreground/80">
            Current Breakpoint
          </span>
          <div className="flex flex-col [&_div]:font-mono font-semibold text-base">
            <Tooltip>
              <TooltipTrigger>
                <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                  sm
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>The viewport is smaller than 640px</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                  md
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>The viewport is between 640px and 768px</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
                  lg
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>The viewport is between 768px and 1024px</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
                  2xl
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>The viewport is between 1536px and 1920px</span>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
                  3xl
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <span>The viewport is larger than 1920px</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
