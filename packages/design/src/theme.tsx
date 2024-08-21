import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type JSX,
  useMemo,
} from "react";

import { THEME_STORAGE_KEY } from "./constants";

// https://ui.shadcn.com/docs/dark-mode/vite

export type Theme = "dark" | "light" | "system";

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme(theme: Theme): void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  ...props
}: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      // avoid breaking during SSR when Next.js is rendering the page
      // Let's not play amateurs here 😎
      return;
    }

    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme(theme: Theme) {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      },
    }),
    [theme, storageKey]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme(): ThemeProviderState {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
}
