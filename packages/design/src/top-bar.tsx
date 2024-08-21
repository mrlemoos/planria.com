import type { HTMLAttributes, JSX, ReactNode } from "react";

import { cn } from "./css";

export interface TopBarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

/**
 * Renders a top bar component.
 */
export function TopBar({
  children,
  className,
  ...props
}: TopBarProps): JSX.Element {
  return (
    <div className="hidden sm:block sticky left-8 right-8 top-8">
      <div className="container mx-auto">
        <header
          {...props}
          className={cn(
            "bg-background/50 border border-zinc-500/30 rounded-full p-2 flex items-center justify-between",
            className
          )}
        >
          {children}
        </header>
      </div>
    </div>
  );
}
