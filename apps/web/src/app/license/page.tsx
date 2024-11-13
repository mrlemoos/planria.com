import { fontMono } from "$/lib/styles/fonts";
import { license } from "$/license";
import { APP_NAME, GIT_REPOSITORY_URL } from "$/server/meta";
import { cn } from "@planria/design/css";
import { Icon } from "@planria/design/icon";
import { date } from "@planria/util/date";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { JSX } from "react";

const lastReviewedAt = new Date(2024, 10, 12, 23, 30);

export const revalidate = 60 * 60 * 24; // 24 hours

export default function Page(): JSX.Element {
  return (
    <main className="container mt-[30dvh] flex flex-col items-center gap-4 min-h-[calc(100dvh-10rem)]">
      <div className="flex justify-center items-center border-b border-b-border pb-4">
        <h1 className="text-2xl font-bold">{APP_NAME}</h1>
      </div>
      <span className="text-center">
        We&apos;re proud to be open-source and free-to-use.
      </span>
      <div
        className={cn(
          "bg-background/05 rounded-lg p-4 max-w-[min(96%,_30rem)] md:max-w-xl lg:max-w-3xl xl:max-w-4xl [&_p]:leading-loose",
          fontMono.className
        )}
      >
        <MDXRemote source={license} />
      </div>
      <span className="text-gray-500 text-center">
        Reviewed on&nbsp;
        <time dateTime={lastReviewedAt.toISOString()}>
          {date(lastReviewedAt).format("MMMM DD, YYYY [at] hh:mm A")}
        </time>
      </span>
      <span
        className="inline-flex items-center gap-1"
        aria-label="Made with love and coffee by Planria Inc."
      >
        Made with <Icon name="Heart" height={16} width={16} />
        &nbsp;and&nbsp;
        <Icon name="Code" height={16} width={16} />
        &nbsp;by&nbsp;
        <Link target="_blank" href={GIT_REPOSITORY_URL}>
          Planria Inc.
        </Link>
      </span>
    </main>
  );
}
