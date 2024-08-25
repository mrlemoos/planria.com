import { Fragment } from "react";

import { Input, type InputProps } from "@planria/design/input";
import { Label } from "@planria/design/label";
import { PasswordInput } from "@planria/design/password-input";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<InputProps>;

export default {
  title: "Components/Form",
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
