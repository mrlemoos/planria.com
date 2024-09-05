import type { JSX, ReactNode } from "react";

import { SignedIn, SignedOut } from "@clerk/nextjs";

export interface ForSignedInProps {
  children: ReactNode;
}

/**
 * Renders the provided children only if the user is signed in.
 */
export function ForSignedIn({ children }: ForSignedInProps): JSX.Element {
  return <SignedIn>{children}</SignedIn>;
}

export interface ForSignedOutProps {
  children: ReactNode;
}

/**
 * Renders the provided children only when the user is signed out.
 */
export function ForSignedOut({ children }: ForSignedOutProps): JSX.Element {
  return <SignedOut>{children}</SignedOut>;
}
