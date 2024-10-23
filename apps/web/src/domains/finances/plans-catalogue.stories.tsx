import type { Meta, StoryObj } from "@storybook/react";

import { PlansCatalogue } from "./plans-catalogue";

const meta: Meta<typeof PlansCatalogue> = {
  title: "Domains/Finances/PlansCatalogue",
  component: PlansCatalogue,
};

export default meta;

type Story = StoryObj<typeof PlansCatalogue>;

export const Organism: Story = {};
