import { Fragment, type JSX, type ReactNode } from "react";

import { Aside } from "$/domains/shared/aside/aside";
import { Header } from "$/domains/shared/header";

export default function Page({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Fragment>
      <Header />
      <Aside />
      {children}
    </Fragment>
  );
}
