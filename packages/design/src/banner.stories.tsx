import { Fragment, type ComponentType } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Banner, BannerChevron, BannerText, type BannerProps } from "./banner";

const meta: Meta<BannerProps> = {
  title: "Design System/Banner",
  component: Banner,
  subcomponents: {
    BannerText,
    BannerChevron,
  } as Record<string, ComponentType<unknown>>,
  args: {
    children: (
      <Fragment>
        <BannerText href="#">
          ✨ Planria is entering beta phase soon exclusively for early partners.
        </BannerText>
        <BannerChevron className="ml-2" />
      </Fragment>
    ),
  },
  argTypes: {
    children: {
      control: {
        // @ts-ignore hack to avoid control but still show the attribute in the docs
        type: null,
      },
      table: {
        type: {
          summary: "ReactNode",
          detail:
            "Preferably composed by the BannerText and BannerChevron composite components",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<BannerProps>;

export const Default: Story = {};
