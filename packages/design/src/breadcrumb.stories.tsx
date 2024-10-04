import type { Meta, StoryObj } from "@storybook/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  type BreadcrumbProps,
} from "./breadcrumb";

const meta: Meta<BreadcrumbProps> = {
  title: "Design System/Breadcrumb",
  component: Breadcrumb,
  args: {
    children: (
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>Project</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Feature Flags</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{`{{SLUG}}`}</BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {};
