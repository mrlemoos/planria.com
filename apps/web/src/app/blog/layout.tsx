import type { JSX, ReactNode } from "react";

import { MarketingHeader } from "$/domains/shared/marketing/header";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <div>
      <MarketingHeader />
      {children}
    </div>
  );
}
