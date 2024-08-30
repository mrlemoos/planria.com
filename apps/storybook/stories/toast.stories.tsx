import {
  Fragment,
  useEffect,
  type ButtonHTMLAttributes,
  type JSX,
} from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  ToastController,
  createToastVariants,
  useToast,
  type HotToastPayload,
} from "@planria/design/toast";
import type { Meta, StoryObj } from "@storybook/react";

type Story = StoryObj<HotToastPayload>;

function ArbitraryToastTrigger({
  toastPayload,
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  toastPayload: HotToastPayload;
}): JSX.Element {
  const { toast, dismiss } = useToast();

  useEffect(() => {
    return () => dismiss();
  }, []);

  return (
    <Button
      variant="outlined"
      onClick={() => toast(toastPayload)}
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  );
}

export default {
  title: "Components/Toast",
  args: {
    variant: "coherent",
  },
  argTypes: {
    variant: {
      name: "Toast variant",
      control: {
        type: "select",
        options: [...Object.keys(createToastVariants.variants.variant)],
      },
    },
    title: {
      name: "Toast title",
      control: {
        type: "text",
      },
    },
    description: {
      name: "Toast description",
      control: {
        type: "text",
      },
    },
  },
  decorators: [
    (Story) => (
      <Fragment>
        {Story()}
        <ToastController />
      </Fragment>
    ),
  ],
  render(args) {
    return (
      <ArbitraryToastTrigger toastPayload={args}>
        Show toast
      </ArbitraryToastTrigger>
    );
  },
} satisfies Meta<HotToastPayload>;

export const Playground: Story = {
  args: {
    description: "This is a toast message",
  },
};

export const Coherent: Story = {
  args: {
    description: "This is a coherent toast message",
    variant: "coherent",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
Coherent.storyName = "variant » coherent";

export const CoherentAndTitle: Story = {
  args: {
    title: "Title",
    description: "This is a coherent toast message",
    variant: "coherent",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
CoherentAndTitle.storyName = "variant » coherent + title";

export const Destructive: Story = {
  args: {
    description: "This is a destructive toast message",
    variant: "destructive",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
Destructive.storyName = "variant » destructive";

export const DestructiveAndTitle: Story = {
  args: {
    title: "Title",
    description: "This is a destructive toast message",
    variant: "destructive",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
DestructiveAndTitle.storyName = "variant » destructive + title";

export const Success: Story = {
  args: {
    description: "This is a success toast message",
    variant: "success",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
Success.storyName = "variant » success";

export const SuccessAndTitle: Story = {
  args: {
    title: "Title",
    description: "This is a success toast message",
    variant: "success",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
SuccessAndTitle.storyName = "variant » success + title";

export const Error: Story = {
  args: {
    description: "This is an error toast message",
    variant: "error",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
Error.storyName = "variant » error";

export const ErrorWithTitle: Story = {
  args: {
    title: "Title",
    description: "This is an error toast message",
    variant: "error",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
ErrorWithTitle.storyName = "variant » error + title";

export const Warning: Story = {
  args: {
    description: "This is a warning toast message",
    variant: "warning",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
Warning.storyName = "variant » warning";

export const WarningAndTitle: Story = {
  args: {
    title: "Title",
    description: "This is a warning toast message",
    variant: "warning",
  },
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
};
WarningAndTitle.storyName = "variant » warning + title";
