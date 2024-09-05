import type { JSX, ReactNode } from "react";

import { SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";

export interface RedirectToSignInProps {
  children: ReactNode;
}

export function RedirectToSignIn({
  children,
}: RedirectToSignInProps): JSX.Element {
  return <SignInButton mode="redirect">{children}</SignInButton>;
}

export interface RedirectToSignUpProps {
  children: ReactNode;
}

export function RedirectToSignUp({
  children,
}: RedirectToSignUpProps): JSX.Element {
  return <SignUpButton mode="redirect">{children}</SignUpButton>;
}

export interface RedirectToSignOutProps {
  children: ReactNode;
  afterSignOutRedirectURL?: string;
}

export function RedirectToSignOut({
  children,
  afterSignOutRedirectURL = "/",
}: RedirectToSignOutProps): JSX.Element {
  return (
    <SignOutButton
      signOutOptions={{
        redirectUrl: afterSignOutRedirectURL,
      }}
    >
      {children}
    </SignOutButton>
  );
}
