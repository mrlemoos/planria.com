import type { JSX } from "react";

import { cn } from "@planria/design/css";
import { heading } from "@planria/design/typography";

export function Landing(): JSX.Element {
  return (
    <div className="mt-40 mb-16 mx-auto container">
      <h1 className={cn(heading({ variant: "h1" }), "text-center")}>
        Ready for the next big step about
        <span className="text-primary">feature flags</span>?
      </h1>
    </div>
  );
}
