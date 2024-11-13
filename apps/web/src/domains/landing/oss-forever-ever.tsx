import { FULL_SOFTWARE_LICENSE_URL, SOFTWARE_LICENSE } from "$/server/meta";
import Link from "next/link";
import type { JSX } from "react";

export function OssForeverEver(): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl font-bold text-center">
        <span aria-label="Open-source forever and ever">
          Open-source forever and <span className="underline">ever</span>
        </span>
      </h2>
      <span className="text-center text-lg">
        We will never charge you for using the open-source version of Planria.
      </span>
      <ul className="list-disc list-inside text-lg">
        <li>
          <strong>You don&apos;t have to trust us:</strong> Self-host the
          platform any place you want.
        </li>
        <li>
          <strong>No stressful data request:</strong>&nbsp;Your feature flags
          are in your codebase, remember?
        </li>
      </ul>
      <span className="text-center text-lg">
        You and we are safe as Planria is developed in the open source way and
        under the&nbsp;
        <Link
          href={FULL_SOFTWARE_LICENSE_URL}
          className="text-sky-400"
          target="_blank"
        >
          {SOFTWARE_LICENSE}&nbsp;license
        </Link>
        .
      </span>
    </div>
  );
}
