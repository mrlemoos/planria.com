import { Fragment } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, type CheckboxProps } from "./checkbox";
import { Label } from "./label";

const meta: Meta<CheckboxProps> = {
  title: "Design System/Checkbox",
  component: Checkbox,
  argTypes: {
    name: {
      table: { disable: true },
    },
  },
};

type Story = StoryObj<CheckboxProps>;

export const Standalone: Story = {};

export const WithLabel: Story = {
  args: {
    name: "checkbox",
  },
  decorators: [
    (Story) => <div className="flex items-center gap-2">{Story()}</div>,
  ],
  render(args) {
    return (
      <Fragment>
        <Checkbox {...args} />
        <Label htmlFor={args.name}>Checkbox label</Label>
      </Fragment>
    );
  },
};
WithLabel.storyName = "+ Label";

export default meta;
