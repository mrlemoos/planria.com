import type { Meta, StoryObj } from "@storybook/react";

import { Button, createButtonStylesheet, type ButtonProps } from "./button";

export default {
  title: "Design System/Button",
  component: Button,
  args: {
    ...createButtonStylesheet.defaultVariants,
  },
  argTypes: {
    children: {
      name: "Label",
      type: {
        name: "string",
        required: true,
      },
      control: {
        type: "text",
      },
      description: "The text to be displayed within the button.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    variant: {
      name: "Variant",
      description:
        "The variant which alters the button's appearance and hierarchy.",
      options: [...Object.keys(createButtonStylesheet.variants.variant)],
      control: {
        type: "select",
      },
      table: {
        type: {
          summary: Object.keys(createButtonStylesheet.variants.variant)
            .map((val) => `"${val}"`)
            .join(" | "),
        },
        defaultValue: {
          summary: "primary",
        },
      },
    },
    size: {
      name: "Size",
      options: [...Object.keys(createButtonStylesheet.variants.size)],
      control: {
        type: "select",
      },
      description: "The size of the button modifies the padding and font size.",
      table: {
        type: {
          summary: Object.keys(createButtonStylesheet.variants.size)
            .map((val) => `"${val}"`)
            .join(" | "),
        },
        defaultValue: {
          summary: "md",
        },
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
Primary.storyName = "Variant/Primary";

export const Secondary: Story = {
  args: {
    children: "Secondary button",
    variant: "secondary",
  },
};
Secondary.storyName = "Variant/Secondary";

export const Outlined: Story = {
  args: {
    children: "Outlined button",
    variant: "outlined",
  },
};
Outlined.storyName = "Variant/Outlined";

export const Ghost: Story = {
  args: {
    children: "Ghost button",
    variant: "ghost",
  },
};
Ghost.storyName = "Variant/Ghost";
