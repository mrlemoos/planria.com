import type { Meta, StoryObj } from "@storybook/react";

import { Logo, createLogoStylesheet, type LogoProps } from "./logo";

type Story = StoryObj<LogoProps>;

export default {
  title: "Design System/Logo",
  component: Logo,
  argTypes: {
    shape: {
      name: "Logo shape",
      options: [...Object.keys(createLogoStylesheet.variants.shape)],
      control: {
        type: "radio",
      },
    },
    size: {
      name: "Logo size",
      options: [...Object.keys(createLogoStylesheet.variants.size)],
      control: {
        type: "radio",
      },
    },
  },
  args: {
    shape: "circle",
    size: "md",
  },
} satisfies Meta<LogoProps>;

export const Circle: Story = {
  args: {
    shape: "circle",
  },
};

export const Rounded: Story = {
  args: {
    shape: "round",
  },
};
