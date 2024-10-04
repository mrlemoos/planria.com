import { type JSX } from "react";

import type { Metadata } from "next";

import { Landing } from "$/domains/landing/landing";
import { createMetadata } from "$/server/seo";

export const metadata: Metadata = createMetadata();

export default function Page(): JSX.Element {
  return <Landing />;
}
