import type { Meta, StoryObj } from "@storybook/react";

import { BorderBeam, type BorderBeamProps } from "./border-beam";

const meta: Meta<BorderBeamProps> = {
  title: "Design System/BorderBeam",
  component: BorderBeam,
  decorators: [(Story) => <div>{Story()}</div>],
  args: {},
};

export default meta;

export const Default: StoryObj<BorderBeamProps> = {};
