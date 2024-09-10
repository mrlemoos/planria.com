"use client";

import {
  createContext,
  useContext,
  useMemo,
  type JSX,
  type ReactNode,
} from "react";

import type { Environment } from "$/lib/schemas/projects/environments";

export interface EnvironmentsContextType {
  environments: Environment[];
}

export const EnvironmentContext = createContext<EnvironmentsContextType | null>(
  null
);

export function useEnvironments(): EnvironmentsContextType {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "The useEnvironments() hook has been called within a host component that is not a descendant of the EnvironmentsProvider component."
    );
  }
  return context;
}

export interface EnvironmentsProviderProps extends EnvironmentsContextType {
  children: ReactNode;
}

export function EnvironmentsProvider({
  children,
  environments,
}: EnvironmentsProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(
    () => ({ environments }),
    [environments]
  );
  return (
    <EnvironmentContext.Provider value={memoizedContextValue}>
      {children}
    </EnvironmentContext.Provider>
  );
}
