import { type JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Particles } from "@planria/design/particles";
import Image from "next/image";
import Link from "next/link";

import { APP_VERSION } from "$/server/meta";

import { HeroSlogan } from "./hero-slogan";

export function Landing(): JSX.Element {
  return (
    <main className="min-h-screen">
      <div className="mt-40 mb-16 mx-auto container">
        <section className="flex justify-center my-12">
          <Badge asChild={true} variant="notice">
            <h2 className="text-4xl font-bold text-center">
              <span>👀 v{APP_VERSION} will be out soon</span>
            </h2>
          </Badge>
        </section>

        <HeroSlogan />

        <section className="flex flex-col items-center gap-1 md:gap-3 my-10">
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
        </section>
      </div>
      <Particles className="w-screen absolute top-32" />
    </main>
  );
}
