import type { Meta, StoryObj } from "@storybook/react";

import { Particles, type ParticlesProps } from "./particles";

const meta: Meta<ParticlesProps> = {
  title: "Design System/Particles",
  component: Particles,
  args: {
    color: "hsl(346.8 77.2% 49.8%)",
    quantity: 100,
    staticity: 50,
    ease: 50,
    size: 0.4,
    refresh: false,
    vx: 0,
    vy: 0,
  },
  argTypes: {
    color: {
      control: "color",
      name: "Colour",
      description: "The colour of the particles.",
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "#ffffff",
        },
      },
    },
    ease: {
      control: "number",
      name: "Ease",
      description: "The ease of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "50",
        },
      },
    },
    className: {
      table: { disable: true },
    },
    quantity: {
      name: "Quantity",
      description: "The quantity of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "100",
        },
      },
    },
    refresh: {
      control: "boolean",
      name: "Refresh",
      description: "Refresh the particles.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    size: {
      control: "number",
      name: "Size",
      description: "The size of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "0.4",
        },
      },
    },
    staticity: {
      control: "number",
      name: "Staticity",
      description: "The staticity of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "50",
        },
      },
    },
    vx: {
      control: "number",
      name: "Vx",
      description: "The Vx of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "0",
        },
      },
    },
    vy: {
      control: "number",
      name: "Vy",
      description: "The Vy of the particles.",
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "0",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<ParticlesProps>;

export const Default: Story = {};
