import { useEffect, useState } from "react";

/**
 * A custom React hook that returns a boolean value indicating whether
 * the specified media query matches the current viewport.
 *
 * @param query The media query string to match against the viewport.
 * @returns A boolean value indicating whether the media query matches the current viewport.
 */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

/**
 * Custom hook that returns a boolean indicating whether the user prefers dark mode.
 * It uses the {@link useMediaQuery | `useMediaQuery`} hook internally to check the
 * preferred color scheme.
 * @returns A boolean value indicating whether the user prefers dark mode.
 */
export function useDarkMode() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
