import type { JSX } from "react";

import { BorderBeam } from "@planria/design/border-beam";
import { Button } from "@planria/design/button";
import { Logo } from "@planria/design/logo";
import { NavigationBar, NavigationBarItem } from "@planria/design/navigation";
import { TopBar } from "@planria/design/top-bar";
import Link from "next/link";

export function MarketingHeader(): JSX.Element {
  return (
    <TopBar className="mb-8 pr-1">
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
        <Button variant="primary" size="sm">
          <Link href="/onboarding">Get Started</Link>
        </Button>
        <BorderBeam className="rounded-full" />
      </NavigationBar>
    </TopBar>
  );
}
