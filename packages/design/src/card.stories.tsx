import { Fragment, type ComponentType } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from "./card";

const meta: Meta<CardProps> = {
  title: "Design System/Card",
  component: Card,
  subcomponents: {
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } as Record<string, ComponentType<unknown>>,
  argTypes: {
    children: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga nulla facere corporis deleniti tempore, non laboriosam explicabo quisquam et architecto enim corrupti itaque! In culpa iusto dolore. Libero, impedit dolorem!",
    className: "p-4 max-w-lg",
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <CardContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo repellat
        rem ipsa facilis, iusto minus sint consequatur, neque itaque eum labore,
        incidunt totam quidem molestias ab recusandae deserunt doloribus esse.
      </CardContent>
    ),
    className: "max-w-lg",
  },
};
WithContent.storyName = "+ Content";

export const WithHeader: Story = {
  args: {
    children: (
      <Fragment>
        <CardHeader>
          <CardTitle>Lorem Ipsum</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
          ducimus, ab deleniti, cumque et fuga asperiores earum veritatis beatae
          dolores dolorem possimus blanditiis enim quisquam assumenda maiores
          nihil porro expedita?
        </CardContent>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithHeader.storyName = "+ Header";

export const WithFooter: Story = {
  args: {
    children: (
      <Fragment>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
          doloribus quibusdam error animi incidunt maxime, culpa fugit veniam!
          Esse labore sint corrupti? Expedita totam eveniet molestiae voluptatem
          dicta labore laboriosam!
        </CardContent>
        <CardFooter>
          <Button>Button</Button>
        </CardFooter>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithFooter.storyName = "+ Footer";

export const WithDescription: Story = {
  args: {
    children: (
      <Fragment>
        <CardHeader>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus sed delectus ipsam incidunt libero labore?
          </CardDescription>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          aut veritatis necessitatibus totam pariatur illo, error vitae
          consequuntur tenetur eveniet optio unde consectetur reprehenderit
          ipsum. Consectetur at veniam id facilis.
        </CardContent>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithDescription.storyName = "+ Description";

export const WithHeaderAndFooter: Story = {
  args: {
    children: (
      <Fragment>
        <CardHeader>
          <CardTitle>Lorem Ipsum</CardTitle>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
          ducimus, ab deleniti, cumque et fuga asperiores earum veritatis beatae
          dolores dolorem possimus blanditiis enim quisquam assumenda maiores
          nihil porro expedita?
        </CardContent>
        <CardFooter>
          <Button>Button</Button>
        </CardFooter>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithHeaderAndFooter.storyName = "+ Header & Footer";

export const WithHeaderAndDescription: Story = {
  args: {
    children: (
      <Fragment>
        <CardHeader>
          <CardTitle>Lorem Ipsum</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            distinctio exercitationem, eos odit nulla officia?
          </CardDescription>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          aut veritatis necessitatibus totam pariatur illo, error vitae
          consequuntur tenetur eveniet optio unde consectetur reprehenderit
          ipsum. Consectetur at veniam id facilis.
        </CardContent>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithHeaderAndDescription.storyName = "+ Header & Description";

export const WithHeaderAndDescriptionAndFooter: Story = {
  args: {
    children: (
      <Fragment>
        <CardHeader>
          <CardTitle>Lorem Ipsum</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            distinctio exercitationem, eos odit nulla officia?
          </CardDescription>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus,
          aut veritatis necessitatibus totam pariatur illo, error vitae
          consequuntur tenetur eveniet optio unde consectetur reprehenderit
          ipsum. Consectetur at veniam id facilis.
        </CardContent>
        <CardFooter>
          <Button>Button</Button>
        </CardFooter>
      </Fragment>
    ),
    className: "max-w-lg",
  },
};
WithHeaderAndDescriptionAndFooter.storyName = "+ Header & Description & Footer";
