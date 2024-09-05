import type { ComponentPropsWithoutRef, JSX } from "react";

import {
  Footer,
  FooterAction,
  FooterContentWrapper,
  FooterProductLogo,
  FooterSection,
} from "@planria/design/footer";
import { muted } from "@planria/design/typography";
import Link from "next/link";

import { APP_NAME, APP_URL, DOMAIN } from "$/server/meta";

interface FooterLinkProps extends ComponentPropsWithoutRef<typeof Link> {}

function FooterLink({
  children,
  className,
  ...props
}: FooterLinkProps): JSX.Element {
  return (
    <FooterAction>
      <Link {...props}>{children}</Link>
    </FooterAction>
  );
}

const currentYear = new Date().getFullYear();

export function BoxFooter(): JSX.Element {
  return (
    <Footer>
      <FooterSection className="flex flex-col justify-center items-center gap-3">
        <FooterProductLogo aria-label={APP_NAME} className="mb-2">
          {APP_NAME} Inc. &copy; {currentYear}
        </FooterProductLogo>
        <FooterContentWrapper>
          <div>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </div>
          <div>
            <FooterLink href="/#features">Features</FooterLink>
            <FooterLink href="/#what-people-say">What People Say</FooterLink>
            <FooterLink
              href="https://www.apache.org/licenses/LICENSE-2.0"
              target="_blank"
            >
              Software License
            </FooterLink>
          </div>
          <div>
            <FooterLink href="/changelog">Changelog</FooterLink>
            <FooterLink href="/open-source">Open Source</FooterLink>
            <FooterLink href="/github">GitHub</FooterLink>
          </div>
        </FooterContentWrapper>
      </FooterSection>
      <FooterSection>
        <p className={muted({ className: "mt-16" })}>
          <Link href={APP_URL}>{DOMAIN}</Link>. Copyright&nbsp;
          {currentYear} &copy;&nbsp;All rights reserved.
        </p>
      </FooterSection>
    </Footer>
  );
}
