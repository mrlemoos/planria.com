"use client";

import { Fragment, forwardRef, useState } from "react";

import { cn } from "./css";
import { createInputStylesheet, type InputProps } from "./input";

export interface PasswordInputProps
  extends Omit<InputProps, "type" | "asChild"> {}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    function handleTogglePasswordVisibility() {
      setPasswordVisibility((prev) => !prev);
    }

    return (
      <Fragment>
        <div
          {...props}
          className={cn(
            createInputStylesheet({ className: "pl-0 py-0 pr-5" }),
            className
          )}
        >
          <input
            ref={forwardedRef}
            type={isPasswordVisible ? "text" : "password"}
            className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 p-4 rounded-l-sm w-full bg-background"
          />
          <button onClick={handleTogglePasswordVisibility}>
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </Fragment>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
