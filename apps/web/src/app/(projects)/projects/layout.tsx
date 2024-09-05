import { Fragment, type JSX, type ReactNode } from "react";

import { Header } from "$/domains/shared/header";

export default function Page({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
}
