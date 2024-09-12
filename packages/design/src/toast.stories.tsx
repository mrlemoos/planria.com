import {
  Fragment,
  useEffect,
  type ButtonHTMLAttributes,
  type JSX,
} from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { cn } from "./css";
import {
  ToastController,
  createToastVariants,
  useToast,
  type HotToastPayload,
} from "./toast";

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

const meta: Meta<HotToastPayload> = {
  // defining the meta object and then exporting it because otherwise
  // caused an inferring error in the Storybook's `render` function.
  title: "Design System/Toast",
  args: {
    variant: "coherent",
  },
  argTypes: {
    variant: {
      name: "Toast variant",
      description:
        "The variant of the toast which alters the appearance and hierarchy of the toast as well as the action that it implies.",
      control: {
        type: "select",
      },
      options: [...Object.keys(createToastVariants.variants.variant)],
      table: {
        defaultValue: {
          summary: "coherent",
        },
        type: {
          summary: Object.keys(createToastVariants.variants.variant)
            .map((val) => `'${val}'`)
            .join(" | "),
        },
      },
    },
    title: {
      name: "Toast title",
      description:
        "The bolded title of the toast message. It should be concise and informative.",
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "ReactNode",
        },
      },
    },
    description: {
      name: "Toast description",
      description: "The actual text to be displayed in the toast body.",
      control: {
        type: "text",
      },
      table: {
        type: {
          summary: "ReactNode",
        },
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
};

export default meta;

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
Coherent.storyName = "Variant/Coherent";

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
CoherentAndTitle.storyName = "Variant/Coherent + Title";

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
Destructive.storyName = "Variant/Destructive";

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
DestructiveAndTitle.storyName = "Variant/Destructive + Title";

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
Success.storyName = "Variant/Success";

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
SuccessAndTitle.storyName = "Variant/Success + Title";

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
Error.storyName = "Variant/Error";

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
ErrorWithTitle.storyName = "Variant/Error + Title";

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
Warning.storyName = "Variant/Warning";

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
WarningAndTitle.storyName = "Variant/Warning + Title";
