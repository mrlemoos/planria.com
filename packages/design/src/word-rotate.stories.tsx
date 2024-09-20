import { capitalize, randomAdjective, randomNoun } from "@planria/util/strings";
import type { Meta, StoryObj } from "@storybook/react";

import { WordRotate, type WordRotateProps } from "./word-rotate";

type Story = StoryObj<WordRotateProps>;

const meta: Meta<WordRotateProps> = {
  title: "Design System/WordRotate",
  component: WordRotate,
  args: {
    words: [
      randomAdjective(),
      randomNoun(),
      randomAdjective(),
      randomNoun(),
      randomAdjective(),
      randomNoun(),
    ].map(capitalize),
  },
  argTypes: {
    words: {
      name: "Words",
      description: "The words to rotate through",
      control: {
        // @ts-expect-error
        type: null,
      },
    },
  },
};

export default meta;

export const Default: Story = {};
