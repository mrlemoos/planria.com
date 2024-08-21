import { Fragment } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps,
} from "@planria/design/avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<AvatarProps>;

type Story = StoryObj<AvatarProps>;

export const RemoteImage: Story = {
  args: {
    children: (
      <Fragment>
        <AvatarImage
          src="https://avatars.githubusercontent.com/u/69330304?v=4"
          alt="A man in his 20s, with a sharp hairdo and narrow beard"
        />
      </Fragment>
    ),
  },
};
RemoteImage.storyName = "Remote image";

export const WithFallback: Story = {
  args: {
    children: (
      <Fragment>
        <AvatarImage src="https://completely-broken-url" alt="Yeah, nice try" />
        <AvatarFallback>U</AvatarFallback>
      </Fragment>
    ),
  },
};
WithFallback.storyName = "Failed image + fallback";
