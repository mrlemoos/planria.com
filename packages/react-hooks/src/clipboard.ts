import { useCallback, useState } from "react";

/**
 * Custom hook that provides functionality to copy text to the user's clipboard.
 * See an example below:
 *
 * ```tsx
 * import { useClipboard } from "@planria/react-hooks";
 *
 * // ...
 *
 * const [copied, copyValue] = useClipboard();
 *
 * return (
 *   <button onClick={() => copyValue("Hello, World!")}>
 *     Copy to clipboard
 *   </button>
 * );
 * ```
 * @returns A tuple containing the copied value and the copyValue function.
 */
export function useClipboard() {
  const [copiedValue, setCopied] = useState<string | null>(null);

  const handleCopyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);

      setTimeout(() => {
        setCopied(null);
      }, 3000);
    } catch (error) {
      console.error(
        `It was not possible to copy the selected text to the user's clipboard due to the following error: ${error}`
      );
    }
  }, []);

  return [copiedValue, handleCopyToClipboard] as const;
}
