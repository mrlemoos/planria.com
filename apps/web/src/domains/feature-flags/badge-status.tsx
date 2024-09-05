import { Fragment, type JSX } from "react";

import { Badge, type BadgeProps } from "@planria/design/badge";
import { cn } from "@planria/design/css";

export interface BadgeStatusProps
  extends Omit<BadgeProps, "children" | "variant"> {
  isEnabled: boolean;
}

export function BadgeStatus({
  className,
  isEnabled,
  ...props
}: BadgeStatusProps): JSX.Element {
  return (
    <Badge
      {...props}
      variant={isEnabled ? "success" : "destructive"}
      className={cn("flex items-center gap-2 w-min", className)}
    >
      {isEnabled ? (
        <Fragment>
          <div className="relative rounded-full size-2 bg-success-foreground">
            <div
              aria-hidden="true"
              className="bg-success animate-ping rounded-full size-2 absolute inset-0"
            />
          </div>
          Enabled
        </Fragment>
      ) : (
        "Disabled"
      )}
    </Badge>
  );
}
