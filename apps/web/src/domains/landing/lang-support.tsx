import { Fragment, type JSX } from "react";

import Image from "next/image";
import Link from "next/link";

export function LangSupport(): JSX.Element {
  return (
    <Fragment>
      <span className="font-semibold text-xl">
        Our SDK supports the following technologies:
      </span>
      <div className="flex flex-wrap items-center gap-1 md:gap-3 lg:gap-5 text-black dark:text-white">
        <Link href="https://bun.sh" target="_blank" aria-label="Bun">
          <Image
            src="/logos/supported/sdk/bun@dark.svg"
            alt="Deno"
            width={48}
            height={48}
            className="block dark:hidden"
          />
          <Image
            src="/logos/supported/sdk/bun.svg"
            alt="Deno"
            width={48}
            height={48}
            className="hidden dark:block"
          />
        </Link>
        <Link
          href="https://deno.com"
          target="_blank"
          className="cursor-pointer"
          aria-label="Deno"
        >
          <Image
            src="/logos/supported/sdk/deno@dark.svg"
            alt="Deno"
            width={48}
            height={48}
            className="block dark:hidden"
          />
          <Image
            src="/logos/supported/sdk/deno.svg"
            alt="Deno"
            width={48}
            height={48}
            className="hidden dark:block"
          />
        </Link>
        <Link href="https://nodejs.org">
          <Image
            src="/logos/supported/sdk/node@dark.svg"
            alt="Nodejs"
            width={48}
            height={48}
            className="block dark:hidden"
          />
          <Image
            src="/logos/supported/sdk/node.svg"
            alt="NodeJS"
            width={48}
            height={48}
            className="hidden dark:block"
          />
        </Link>
        <Link href="https://nextjs.org">
          <Image
            src="/logos/supported/sdk/next@dark.svg"
            alt="Next.js"
            width={48}
            height={48}
            className="block dark:hidden"
          />
          <Image
            src="/logos/supported/sdk/next.svg"
            alt="Next.js"
            width={48}
            height={48}
            className="hidden dark:block"
          />
        </Link>
      </div>
    </Fragment>
  );
}
