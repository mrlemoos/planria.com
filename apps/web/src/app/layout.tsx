import type { JSX, ReactNode } from "react";

import { cn } from "@planria/design/css";
import { ThemeProvider } from "@planria/design/theme";
import { ToastController } from "@planria/design/toast";
import type { Metadata } from "next";

import { BoxFooter } from "$/components/box-footer";
import { BreakpointMarker } from "$/components/dev/breakpoint/marker";
import { AuthProvider } from "$/lib/auth/provider";
import { fontSans } from "$/lib/styles/fonts";
import "$/lib/styles/globals.css";
import { env } from "$/server/env";
import { APP_NAME, PRODUCT_DESCRIPTION } from "$/server/meta";

export const metadata: Metadata = {
  title: `${APP_NAME} | ${PRODUCT_DESCRIPTION}`,
  description: PRODUCT_DESCRIPTION,
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>): JSX.Element {
  return (
    <AuthProvider>
      <ThemeProvider>
        <html lang="en">
          <body
            className={cn(
              "antialiased bg-background text-foreground",
              fontSans.className
            )}
          >
            {children}
            <BoxFooter />
            <ToastController />
            {env("NODE_ENV") === "development" && <BreakpointMarker />}
          </body>
        </html>
      </ThemeProvider>
    </AuthProvider>
  );
}
