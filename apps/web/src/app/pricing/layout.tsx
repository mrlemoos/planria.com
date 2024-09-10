import { Fragment, type JSX, type ReactNode } from "react";

import { MarketingHeader } from "$/domains/shared/marketing/header";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Fragment>
      <MarketingHeader />
      {children}
    </Fragment>
  );
}
