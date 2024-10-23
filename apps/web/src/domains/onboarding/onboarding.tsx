import type { JSX } from "react";

import { Logo } from "@planria/design/logo";

import { NewProject } from "$/domains/projects/new";

export function Onboarding(): JSX.Element {
  return (
    <div className="mx-auto container min-h-[70dvh] mt-16 max-w-lg">
      <div className="flex flex-col justify-center gap-1 sm:gap-3 p-2 sm:p-3 md:p-4 lg:p-5">
        <Logo variant="coherent" />
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome onboard</h1>
        <h2 className="text-foreground/80 my-3">
          Let&apos;s get your feature flags on the edge 🚀
        </h2>
        <NewProject />
      </div>
    </div>
  );
}
