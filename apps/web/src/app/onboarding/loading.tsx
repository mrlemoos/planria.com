import type { JSX } from "react";

import { cn } from "@planria/design/css";
import { Spinner } from "@planria/design/spinner";
import { heading } from "@planria/design/typography";

export default function Loading(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center justify-center">
        <span className={cn(heading({ variant: "h4" }), "animate-in")}>
          Welcome to planria ❤️
        </span>
        <Spinner aria-busy="true" />
      </div>
    </div>
  );
}
