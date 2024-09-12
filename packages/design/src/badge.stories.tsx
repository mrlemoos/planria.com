import type { Meta, StoryObj } from "@storybook/react";

import { Badge, createBadgeVariants, type BadgeProps } from "./badge";

type Story = StoryObj<BadgeProps>;

export default {
  title: "Design System/Badge",
  component: Badge,
  argTypes: {
    variant: {
      name: "Variant",
      description: "The variant of the badge.",
      options: [...Object.keys(createBadgeVariants.variants.variant)],
      control: {
        type: "select",
      },
      table: {
        type: {
          summary: Object.keys(createBadgeVariants.variants.variant)
            .map((val) => `"${val}"`)
            .join(" | "),
        },
        defaultValue: {
          summary: "primary",
        },
      },
    },
    children: {
      name: "Label",
      description: "The text to be displayed within the badge.",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
  args: {
    variant: "primary",
    children: "Badge",
  },
} satisfies Meta<typeof Badge>;

export const Playground: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};

export const Success: Story = {
  args: {
    variant: "success",
  },
  argTypes: {
    variant: {
      table: { disable: true },
    },
  },
};
