"use client";

import {
  type HTMLAttributes,
  type JSX,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { Icon } from "@planria/design/icon";
import { useToast } from "@planria/design/toast";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { useClipboard } from "@planria/react-hooks/clipboard";
import { highlight } from "sugar-high";

import { fontCode } from "$/lib/styles/fonts";

import "./code-snippet.css";

interface CodeSnippetContextType {
  codeSnippet: string;
}

const CodeSnippetContext = createContext<CodeSnippetContextType | null>(null);

export function useCodeSnippetContext(): CodeSnippetContextType {
  const context = useContext(CodeSnippetContext);
  if (!context) {
    throw new Error(
      "The useCodeSnippetContext() hook cannot access the context value. Please make sure that the CodeSnippet is within a CodeSnippetProvider."
    );
  }
  return context;
}

export interface CodeSnippetProviderProps
  extends HTMLAttributes<HTMLDivElement> {
  codeSnippet: string;
}

export function CodeSnippetProvider({
  children,
  className,
  codeSnippet,
  ...props
}: CodeSnippetProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(() => ({ codeSnippet }), [codeSnippet]);

  return (
    <CodeSnippetContext.Provider value={memoizedContextValue}>
      <div {...props} className={cn("flex flex-col gap-1", className)}>
        {children}
      </div>
    </CodeSnippetContext.Provider>
  );
}

export interface CodeSnippetCopyButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "type" | "children"> {}

export function CodeSnippetCopyButton({
  className,
  ...props
}: CodeSnippetCopyButtonProps): JSX.Element {
  const [copiedValue, copy] = useClipboard();
  const { codeSnippet } = useCodeSnippetContext();
  const { toast } = useToast();

  async function handleCopyToClipboard() {
    await copy(codeSnippet);
    toast({
      children: "Copied to clipboard",
      variant: "coherent",
    });
  }

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button
            {...props}
            size="icon"
            className={cn(className)}
            onClick={handleCopyToClipboard}
            aria-label="Copy to clipboard"
            variant="ghost"
          >
            <Icon
              name={copiedValue ? "ClipboardCopy" : "Clipboard"}
              size={18}
              aria-hidden="true"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Click to copy to clipboard
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export interface CodeSnippetProps extends HTMLAttributes<HTMLPreElement> {}

export const CodeSnippet = forwardRef<HTMLPreElement, CodeSnippetProps>(
  ({ children, className, ...props }, forwardedRef) => {
    const { codeSnippet } = useCodeSnippetContext();

    return (
      <pre {...props} className={cn(className)} ref={forwardedRef}>
        {!!codeSnippet && (
          <code
            className={cn("text-sm font-mono", fontCode.className)}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Yeah, we have to do that :/
            dangerouslySetInnerHTML={{ __html: highlight(codeSnippet) }}
          />
        )}
        {children}
      </pre>
    );
  }
);
CodeSnippet.displayName = "CodeSnippet";
