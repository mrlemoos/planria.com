import { cn, stylesheet, type VariantProps } from "./css";

const createHeadingStylesheet = stylesheet.create({
  base: "scroll-m-20 tracking-tight",
  variants: {
    variant: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",
    },
  },
});

/**
 * Generates a heading element with the specified variant and optional class name.
 * @param options The options for generating the heading.
 * @param options.className The optional class name to apply to the heading element.
 * @param options.variant The variant of the heading element.
 * @returns The generated heading element as a string.
 */
export function heading({
  className,
  variant,
}: { className?: string } & Required<
  VariantProps<typeof createHeadingStylesheet>
>): string {
  return cn(createHeadingStylesheet({ variant }), className);
}

/**
 * Generates a paragraph element with optional class name.
 * @param options The options for the paragraph element.
 * @param options.className The class name for the paragraph element.
 * @returns The generated paragraph element as a string.
 */
export function p({ className }: { className?: string } = {}): string {
  return cn("leading-7 [&:not(:first-child)]:mt-6", className);
}

/**
 * Generates a blockquote HTML element with optional class name.
 * @param options The options for the blockquote.
 * @param options.className The class name for the blockquote element.
 * @returns The generated blockquote element as a string.
 */
export function blockquote({ className }: { className?: string } = {}): string {
  return cn("mt-6 border-l-2 pl-6 italic", className);
}

/**
 * Generates an unordered list HTML string with optional class name.
 * @param options The options for the unordered list.
 * @param options.className The class name for the unordered list.
 * @returns The generated unordered list HTML string.
 */
export function ul({ className }: { className?: string } = {}): string {
  return cn("my-6 ml-6 list-disc [&>li]:mt-2", className);
}

/**
 * Generates the inline code CSS class string.
 * @param options The options for generating the inline code CSS class string.
 * @param options.className The additional CSS class name to be added.
 * @returns The inline code CSS class string.
 */
export function inlineCode({ className }: { className?: string } = {}): string {
  return cn(
    "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    className
  );
}

/**
 * Generates a CSS class for lead typography.
 * @param options The options for generating the class.
 * @param options.className Additional CSS class to be added.
 * @returns The generated CSS class.
 */
export function lead({ className }: { className?: string } = {}): string {
  return cn("text-xl text-muted-foreground", className);
}

/**
 * Returns a string representing the CSS class for large typography.
 * @param options The options for the large typography.
 * @param options.className An optional additional CSS class name.
 * @returns The CSS class for large typography.
 */
export function large({ className }: { className?: string } = {}): string {
  return cn("text-lg font-semibold", className);
}

/**
 * Returns a string with the CSS classes for a muted text.
 * @param options The options for the muted text.
 * @param options.className An optional additional CSS class name.
 * @returns A string with the CSS classes for the muted text.
 */
export function muted({ className }: { className?: string } = {}): string {
  return cn("text-sm text-muted-foreground", className);
}
