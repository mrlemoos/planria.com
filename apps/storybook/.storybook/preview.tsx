import React from "react";

import { MDXProvider } from "@mdx-js/react";
import { cn } from "@planria/design/css";
import { ThemeProvider } from "@planria/design/theme";
import { blockquote, heading, p, ul } from "@planria/design/typography";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DocsContainer } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

import "../globals.css";

export const MyDocsContainer = (
  props: React.ComponentPropsWithoutRef<typeof DocsContainer>
) => (
  <MDXProvider
    components={{
      h1: (props) => (
        <h1
          {...props}
          className={cn(
            heading({ variant: "h1" }),
            props.className,
            "font-sans"
          )}
        />
      ),
      h2: (props) => (
        <h2
          {...props}
          className={cn(
            heading({ variant: "h2" }),
            props.className,
            "font-sans"
          )}
        />
      ),
      h3: (props) => (
        <h3
          {...props}
          className={cn(
            heading({ variant: "h3" }),
            props.className,
            "font-sans"
          )}
        />
      ),
      h4: (props) => (
        <h4
          {...props}
          className={cn(
            heading({ variant: "h4" }),
            props.className,
            "font-sans"
          )}
        />
      ),
      a: (props) => (
        <a
          {...props}
          className={cn(props.className, "underline font-sans text-primary")}
        />
      ),
      p: (props) => (
        <p {...props} className={cn(p(), props.className, "font-sans")} />
      ),
      blockquote: (props) => (
        <blockquote
          {...props}
          className={cn(blockquote(), props.className, "font-sans")}
        />
      ),
      ul: (props) => (
        <ul {...props} className={cn(ul(), props.className, "font-sans")} />
      ),
      li: (props) => (
        <li {...props} className={cn(props.className, "font-sans")} />
      ),
    }}
  >
    <DocsContainer {...props} />
  </MDXProvider>
);

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
    (Story) => <ThemeProvider>{Story()}</ThemeProvider>,
  ],
  parameters: {
    layout: "centered",
    backgrounds: {
      values: [
        { name: "light", value: "#fff" },
        { name: "dark", value: "#000" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      container: MyDocsContainer,
    },
  },
  tags: ["autodocs", "autodocs"],
};

export default preview;
