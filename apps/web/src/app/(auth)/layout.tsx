import { Fragment, type JSX, type ReactNode } from "react";

import { ClerkTag } from "$/components/clerk-tag";
import { APP_NAME, PRODUCT_DESCRIPTION } from "$/server/meta";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <Fragment>
      <div className="flex items-center flex-col-reverse md:flex-row min-h-screen">
        <div className="w-1/2 h-screen hidden md:flex justify-center flex-col items-center gap-3 bg-primary text-primary-foreground">
          <h1 className="text-2xl font-semibold">{APP_NAME}</h1>
          <h2 className="text-xl font-medium">{PRODUCT_DESCRIPTION}</h2>
        </div>
        <div className="w-1/2 flex items-center justify-center">{children}</div>
      </div>
      <div className="fixed left-4 bottom-4">
        <ClerkTag />
      </div>
    </Fragment>
  );
}
