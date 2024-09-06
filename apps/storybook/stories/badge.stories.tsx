import {
  Badge,
  createBadgeVariants,
  type BadgeProps,
} from "@planria/design/badge";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<BadgeProps>;

export default {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      name: "Variant",
      options: [...Object.keys(createBadgeVariants.variants.variant)],
    },
    children: {
      name: "Label",
    },
  },
  args: {
    variant: "primary",
    children: "Badge",
  },
} as Meta<BadgeProps>;

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
