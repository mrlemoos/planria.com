import { type HTMLAttributes, type JSX } from "react";

import { cn } from "./css";

export interface DividerProps extends HTMLAttributes<HTMLElement> {}

export function Divider({ className, ...props }: DividerProps): JSX.Element {
  return (
    <div
      {...props}
      className={cn(
        "my-4 border-t border-gray-200 dark:border-gray-600",
        className
      )}
    />
  );
}
