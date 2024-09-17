import React from "react";

import { ThemeProvider } from "@planria/design/theme";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";

import "../globals.css";

export const decorators: Preview["decorators"] = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  (Story) => <ThemeProvider>{Story()}</ThemeProvider>,
];

export const parameters: Preview["parameters"] = {
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
};
export const tags = ["autodocs", "autodocs"];
