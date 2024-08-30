import type { HTMLAttributes, JSX } from "react";

import { cn } from "./css";

export interface PingProps extends HTMLAttributes<HTMLElement> {}

export function Ping({
  children,
  className,
  ...props
}: PingProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "animate-ping rounded-full size-2 bg-current cursor-wait",
        className
      )}
    >
      {children}
    </div>
  );
}
