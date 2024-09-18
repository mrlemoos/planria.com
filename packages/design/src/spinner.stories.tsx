import type { Meta, StoryObj } from "@storybook/react";

import { Spinner, type SpinnerProps } from "./spinner";

const meta: Meta<SpinnerProps> = {
  title: "Design System/Spinner",
  component: Spinner,
  args: {},
};

export default meta;

type Story = StoryObj<SpinnerProps>;

export const Default: Story = {};
