import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  createButtonStylesheet,
  type ButtonProps,
} from "@planria/design/button";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    ...createButtonStylesheet.defaultVariants,
  },
  argTypes: {
    children: {
      name: "Button label",
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: "text",
      },
    },
    variant: {
      name: "Button variant",
      options: [...Object.keys(createButtonStylesheet.variants.variant)],
      control: {
        type: "radio",
      },
    },
    size: {
      name: "Button size",
      options: [...Object.keys(createButtonStylesheet.variants.size)],
      control: {
        type: "radio",
      },
    },
  },
} satisfies Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: "Primary button",
  },
};
Primary.storyName = "variant » primary";

export const Secondary: Story = {
  args: {
    children: "Secondary button",
    variant: "secondary",
  },
};
Secondary.storyName = "variant » secondary";

export const Outlined: Story = {
  args: {
    children: "Outlined button",
    variant: "outlined",
  },
};
Outlined.storyName = "variant » outlined";

export const Ghost: Story = {
  args: {
    children: "Ghost button",
    variant: "ghost",
  },
};
Ghost.storyName = "variant » ghost";
