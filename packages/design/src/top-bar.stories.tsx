import { Fragment } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Logo } from "./logo";
import { NavigationBar, NavigationBarItem } from "./navigation";
import { TopBar, type TopBarProps } from "./top-bar";

type Story = StoryObj<TopBarProps>;

export default {
  title: "Design System/TopBar",
  component: TopBar,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<TopBarProps>;

export const WithNavigation: Story = {
  args: {
    children: (
      <NavigationBar>
        <NavigationBarItem>Feature Flags</NavigationBarItem>
        <NavigationBarItem>A/B Testing</NavigationBarItem>
        <NavigationBarItem>Remote Config</NavigationBarItem>
      </NavigationBar>
    ),
  },
};
WithNavigation.storyName = "Navigation";

export const WithNavigationAndLogo: Story = {
  args: {
    children: (
      <Fragment>
        <Logo />
        <NavigationBar>
          <NavigationBarItem>Feature Flags</NavigationBarItem>
          <NavigationBarItem>A/B Testing</NavigationBarItem>
          <NavigationBarItem>Remote Config</NavigationBarItem>
        </NavigationBar>
      </Fragment>
    ),
  },
};
WithNavigationAndLogo.storyName = "Navigation + Logo";

export const WithNavigationAndLogoAndRemoteImageAvatar: Story = {
  args: {
    children: (
      <Fragment>
        <Logo />
        <NavigationBar>
          <NavigationBarItem>Feature Flags</NavigationBarItem>
          <NavigationBarItem>A/B Testing</NavigationBarItem>
          <NavigationBarItem>Remote Config</NavigationBarItem>
        </NavigationBar>
        <Avatar>
          <AvatarImage
            src="https://avatars.githubusercontent.com/u/69330304?v=4"
            alt="A man in his 20s, with a sharp hairdo and narrow beard"
          />
        </Avatar>
      </Fragment>
    ),
  },
};
WithNavigationAndLogoAndRemoteImageAvatar.storyName =
  "Navigation + Logo + Remote image avatar";

export const WithNavigationAndLogoAndAvatarFallback: Story = {
  args: {
    children: (
      <Fragment>
        <Logo />
        <NavigationBar>
          <NavigationBarItem>Feature Flags</NavigationBarItem>
          <NavigationBarItem>A/B Testing</NavigationBarItem>
          <NavigationBarItem>Remote Config</NavigationBarItem>
        </NavigationBar>
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </Fragment>
    ),
  },
};
WithNavigationAndLogoAndAvatarFallback.storyName =
  "Navigation + Logo + Fallback avatar";
