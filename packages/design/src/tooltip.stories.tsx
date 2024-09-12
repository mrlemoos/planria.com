import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
  type TooltipContentProps,
} from "./tooltip";

const meta: Meta<TooltipContentProps> = {
  title: "Design System/Tooltip",
  argTypes: {
    children: {
      name: "Content",
      description: "The text or element displayed in the tooltip.",
      control: "text",
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    side: {
      name: "Side",
      description: "The side of the trigger the tooltip should appear on.",
      control: {
        type: "select",
      },
      options: ["top", "right", "bottom", "left"],
      table: {
        type: {
          summary: "'top' | 'right' | 'bottom' | 'left'",
        },
        defaultValue: {
          summary: "top",
        },
      },
    },
    align: {
      name: "Align",
      description: "The alignment of the tooltip relative to the trigger.",
      control: {
        type: "select",
      },
      options: ["start", "center", "end"],
      table: {
        type: {
          summary: "'start' | 'center' | 'end'",
        },
        defaultValue: {
          summary: "center",
        },
      },
    },
    sideOffset: {
      name: "Side Offset",
      description: "The distance between the tooltip and the trigger.",
      control: "number",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "4",
        },
      },
    },
    alignOffset: {
      name: "Align Offset",
      description: "The distance between the tooltip and the trigger.",
      control: "number",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "number",
        },
      },
    },
  },
  args: {
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    side: "top",
    align: "center",
    sideOffset: 4,
    alignOffset: 0,
  },
  render({ children, ...args }) {
    return (
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="outlined">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent {...args}>{children}</TooltipContent>
      </Tooltip>
    );
  },
};

export default meta;

type Story = StoryObj<TooltipContentProps>;

export const Default: Story = {};

export const CustomContent: Story = {
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
  args: {
    children: (
      <div className="flex flex-col gap-1">
        <p>You can even have a button within a tooltip!</p>
        <div>
          <Button size="sm">Button</Button>
        </div>
      </div>
    ),
  },
};

export const WithArrow: Story = {
  args: {
    children: "This tooltip has an arrow.",
  },
  render({ children, ...args }) {
    return (
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="outlined">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent {...args}>
          {children}
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
    );
  },
};
WithArrow.storyName = "+ Arrow";
