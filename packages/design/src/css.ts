import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

/**
 * The stylesheet object maps the Tailwind CSS classes to the corresponding CSS-in-JS object.
 * See an example below:
 *
 * ```ts
 * import { stylesheet } from "@planria/design/css";
 *
 * const createBoxStyles = stylesheet.create({
 *   base: "p-4",
 *   variants: {
 *      color: {
 *        red: "bg-red-500",
 *      },
 *   },
 * });
 * ```
 */
export const stylesheet = {
  create: tv,
} as const;

export type { VariantProps } from "tailwind-variants";

/**
 * Utility function to merge Tailwind CSS classes by sorting and deduplicating them.
 * The last class takes precedence.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function toRem(px: number): string {
  return `${px / 16}rem`;
}
