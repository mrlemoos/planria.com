import type { JSX } from "react";

import { useFormContext } from "@planria/design/form";

import {
  CodeSnippet,
  CodeSnippetCopyButton,
  CodeSnippetProvider,
} from "$/components/code-snippet";

import { FEATURE_FLAG_SLUG_PLACEHOLDER } from "./constants";
import type { CreateFeatureFlagFormValues } from "./schema";

export function SDKPreview(): JSX.Element {
  const { watch } = useFormContext<CreateFeatureFlagFormValues>();

  const slug = watch("slug");
  const value = watch("defaultValue");

  return (
    <CodeSnippetProvider
      className="hidden md:flex"
      codeSnippet={`import { getFeatureFlag } from "@planria-sdk/node";

getFeatureFlag("${slug || FEATURE_FLAG_SLUG_PLACEHOLDER}"); // ${value}
        `}
    >
      <CodeSnippet />
      <CodeSnippetCopyButton />
    </CodeSnippetProvider>
  );
}
