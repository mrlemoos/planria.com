import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { heading } from "@planria/design/typography";
import Link from "next/link";

import { fontMono } from "$/lib/styles/fonts";

export default function NotFound({ reset }: { reset(): void }): JSX.Element {
  return (
    <div className="container mx-auto">
      <div className="flex gap-8 flex-col justify-center items-center min-h-[70dvh]">
        <h1
          className={cn(
            heading({ variant: "h1" }),
            fontMono.className,
            "text-8xl font-black"
          )}
        >
          404
        </h1>
        <p>Sorry. Page not found.</p>
        <div className="flex flex-col md:flex-row">
          <Button variant="link" asChild={true}>
            <Link href="/">Go to homepage</Link>
          </Button>
          <Button variant="secondary" onClick={reset}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
