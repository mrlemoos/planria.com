"use client";

import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type ReactNode,
} from "react";

import type { AccessTokenAndEnvironment } from "$/lib/schemas/projects/access-tokens+environment";

export interface AccessTokensContextType {
  accessTokens: AccessTokenAndEnvironment[];
}

export const AccessTokensContext =
  createContext<AccessTokensContextType | null>(null);

export interface AccessTokensProviderProps extends AccessTokensContextType {
  children: ReactNode;
}

export function AccessTokensProvider({
  accessTokens,
  children,
}: AccessTokensProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(
    () => ({ accessTokens }),
    [accessTokens]
  );
  return (
    <AccessTokensContext.Provider value={memoizedContextValue}>
      {children}
    </AccessTokensContext.Provider>
  );
}

export function useAccessTokens(): AccessTokensContextType {
  const context = useContext(AccessTokensContext);
  if (context === null) {
    throw new Error(
      "The useAccessTokens() hook was called but the context could not be found. Please ensure that the component is wrapped in the AccessTokensProvider component in the component tree."
    );
  }
  return context;
}
