import { Icon } from "@planria/design/icon";
import type { JSX } from "react";

export function InfrastructureAtScale(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <h2 className="text-4xl font-bold">Infrastructure at scale</h2>
        <span className="text-2xl">
          Our opt-in infrastructure grows as your app scales.&nbsp;
          <strong className="font-semibold">
            <br />
            No unnecessary costs. No underlying pricing.
          </strong>
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-3xl">Autoscaling</span>
          <div className="flex items-center gap-1" aria-label="Up">
            <Icon
              name="DoubleArrowUp"
              className="w-10 h-10 text-emerald-950 dark:text-emerald-50"
              aria-hidden="true"
            />
            <Icon
              name="DoubleArrowUp"
              className="w-10 h-10 text-emerald-950 dark:text-emerald-50"
              aria-hidden="true"
            />
            <Icon
              name="DoubleArrowUp"
              className="w-10 h-10 text-emerald-950 dark:text-emerald-50"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex items-center gap-1.5 w-full justify-end">
          <span className="font-semibold text-3xl">Latency</span>
          <div className="flex items-center gap-1" aria-label="Down">
            <Icon
              name="DoubleArrowDown"
              className="w-10 h-10 text-rose-950 dark:text-rose-50"
              aria-hidden="true"
            />
            <Icon
              name="DoubleArrowDown"
              className="w-10 h-10 text-rose-950 dark:text-rose-50"
              aria-hidden="true"
            />
            <Icon
              name="DoubleArrowDown"
              className="w-10 h-10 text-rose-950 dark:text-rose-50"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
