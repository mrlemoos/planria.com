import type { JSX } from "react";

import type { Metadata } from "next";

import { Dashboard } from "$/domains/projects/management/dashboard";
import { createMetadata } from "$/server/seo";

export const metadata: Metadata = createMetadata({
  noIndex: true,
});

export default function Page(): JSX.Element {
  return <Dashboard />;
}
