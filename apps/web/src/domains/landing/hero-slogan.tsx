"use client";

import { type JSX } from "react";

import { CodeSnippet, CodeSnippetProvider } from "$/components/code-snippet";

const codeSnippet = `
// src/flags.ts
import { flag, experimental, remoteConfig } from "@planria-sdk/node";

export const isProductPageEnabled = flag({ defaultValue: false });

export const partialDashboardAccess = experimental({
  variationOf: [50, 50],
});

export const sharedEnvironmentConfig = remoteConfig({
  apiURL: {
    development: "https://dev.api.example.com",
    staging: "https://staging.api.example.com",
    production: "https://api.example.com",
  },
});
`;

export function HeroSlogan(): JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 p-8 lg:p-12 backdrop-blur-lg bg-zinc-50 dark:bg-zinc-950 rounded-xl">
      <h1 className="flex flex-col gap-2">
        <span className="flex flex-col gap-1 font-bold text-3xl">
          <span>Feature Flags</span>
          <span>Remote Configs</span>
          <span>A/B Testing</span>
        </span>
        <span className="font-semibold text-2xl">as Code</span>
        <span className="font-medium text-lg">
          On the edge. No fuss. No hassle.
        </span>
      </h1>
      <div>
        <CodeSnippetProvider codeSnippet={codeSnippet}>
          <CodeSnippet />
        </CodeSnippetProvider>
      </div>
    </div>
  );
}
