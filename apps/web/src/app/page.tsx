import { Fragment, type JSX } from "react";

import type { Metadata } from "next";

import { createMetadata } from "$/server/seo";

export const metadata: Metadata = createMetadata();

export default function Page(): JSX.Element {
  return <Fragment></Fragment>;
}
