import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "./css";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, forwardedRef) => (
    <textarea
      {...props}
      ref={forwardedRef}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 invalid:text-destructive",
        className
      )}
    />
  )
);
Textarea.displayName = "Textarea";
