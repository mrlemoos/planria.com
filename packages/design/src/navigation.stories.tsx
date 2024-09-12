import { Fragment } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  NavigationBar,
  NavigationBarItem,
  type NavigationBarProps,
} from "./navigation";

type Story = StoryObj<NavigationBarProps>;

export default {
  title: "Design System/Navigation",
  component: NavigationBar,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<NavigationBarProps>;

export const Default: Story = {
  args: {
    children: (
      <Fragment>
        <NavigationBarItem>Alpha α</NavigationBarItem>
        <NavigationBarItem>Beta β</NavigationBarItem>
        <NavigationBarItem>Lambda ƛ</NavigationBarItem>
      </Fragment>
    ),
  },
};
Default.storyName = "Bar + Items";
