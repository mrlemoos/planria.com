import { Fragment, type ComponentType } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type TableProps,
} from "./table";

const meta: Meta<TableProps> = {
  title: "Design System/Table",
  component: Table,
  subcomponents: {
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } as Record<string, ComponentType<unknown>>,
  argTypes: {
    children: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<TableProps>;

export const Default: Story = {
  args: {
    children: (
      <Fragment>
        <TableHeader>
          <TableHead>Head 1</TableHead>
          <TableHead>Head 2</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Fragment>
    ),
  },
};

export const WithCaption: Story = {
  args: {
    children: (
      <Fragment>
        <TableCaption>This is a table caption.</TableCaption>
        <TableHeader>
          <TableHead>Head 1</TableHead>
          <TableHead>Head 2</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Fragment>
    ),
  },
};
WithCaption.storyName = "+ Caption";
