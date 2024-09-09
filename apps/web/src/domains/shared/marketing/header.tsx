import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { Logo } from "@planria/design/logo";
import { NavigationBar, NavigationBarItem } from "@planria/design/navigation";
import { TopBar } from "@planria/design/top-bar";
import Link from "next/link";

export function MarketingHeader(): JSX.Element {
  return (
    <TopBar className="mb-8">
      <Link href="/">
        <Logo size="md" />
      </Link>
      <NavigationBar>
        <NavigationBarItem asChild={true}>
          <Link href="/blog">Blog</Link>
        </NavigationBarItem>
        <NavigationBarItem asChild={true}>
          <Link href="/pricing">Pricing</Link>
        </NavigationBarItem>
        <NavigationBarItem asChild={true}>
          <Link href="/developers">Developers</Link>
        </NavigationBarItem>
        <NavigationBarItem asChild={true}>
          {/* TODO: Use a glowing button here. */}
          <Button variant="primary" asChild={true}>
            <Link href="/onboarding">Get Started</Link>
          </Button>
        </NavigationBarItem>
      </NavigationBar>
    </TopBar>
  );
}
