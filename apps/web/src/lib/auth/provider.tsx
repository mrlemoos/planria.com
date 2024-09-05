"use client";

import type { JSX, ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";

export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * The component that provides authentication context to the application
 * with the 3rd party authentication service.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  return <ClerkProvider>{children}</ClerkProvider>;
}
