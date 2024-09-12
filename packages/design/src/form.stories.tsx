import { Fragment } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Input, type InputProps } from "./input";
import { Label } from "./label";
import { PasswordInput } from "./password-input";

type Story = StoryObj<InputProps>;

export default {
  title: "Design System/Form",
} satisfies Meta<InputProps>;

export const WithInput: Story = {
  render(args) {
    return <Input {...args} />;
  },
};
WithInput.storyName = "Input";

export const WithInputAndLabel: Story = {
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    name: "field",
  },
  render(args) {
    return (
      <Fragment>
        <Label htmlFor={args.name}>Input label</Label>
        <Input {...args} />
      </Fragment>
    );
  },
};
WithInputAndLabel.storyName = "Input + Label";

export const WithPasswordInput: Story = {
  render(args) {
    return <PasswordInput {...args} />;
  },
};
WithPasswordInput.storyName = "Password";

export const WithPasswordInputAndDefaultValue: Story = {
  render(args) {
    return <PasswordInput {...args} />;
  },
};
WithPasswordInputAndDefaultValue.storyName = "Password + default value";
