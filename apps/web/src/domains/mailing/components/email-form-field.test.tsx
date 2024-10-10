import type { JSX, ReactNode } from "react";

import { useFormContext as __useFormContext } from "@planria/design/form";
import { Input as __Input, type InputProps } from "@planria/design/input";
import { MockedFunction, expect, test, vi } from "vitest";

import { renderSandbox } from "$/lib/extensions/testing-library+ext";

import { EmailFormField } from "./email-form-field";

vi.mock("@planria/design/form", () => ({
  useFormContext: vi.fn().mockReturnValue({
    control: "form_control",
  }),
  FormControl: function StubFormControl({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    return <div data-testid="form-control">{children}</div>;
  },
  FormField: function StubFormField({
    children,
    control,
  }: {
    children: ReactNode;
    control: string;
  }): JSX.Element {
    return (
      <div data-testid="form-field">
        <div>{control}</div>
        <div>{children}</div>
      </div>
    );
  },
  FormItem: function StubFormField({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    return <div data-testid="form-item">{children}</div>;
  },
  FormLabel: function StubFormField({
    children,
  }: {
    children: ReactNode;
  }): JSX.Element {
    return <div data-testid="form-label">{children}</div>;
  },
}));
const useFormContext = __useFormContext as MockedFunction<
  typeof __useFormContext
>;

vi.mock("@planria/design/input", () => ({
  Input: vi.fn(
    (props: InputProps): JSX.Element => <input data-testid="input" {...props} />
  ),
}));
const Input = __Input as MockedFunction<typeof __Input>;

test("<EmailFormField /> accesses the form context", function () {
  const jsx = <EmailFormField />;

  renderSandbox(jsx);

  expect(useFormContext).toHaveBeenCalled();
});

test("<EmailFormField /> passes the form control to the underlying <FormField /> component", function () {
  const jsx = <EmailFormField />;
  const controlValue = "form_control";
  useFormContext.mockReturnValue({
    control: controlValue,
  } as unknown as ReturnType<typeof __useFormContext>);

  const { screen } = renderSandbox(jsx);

  const controlElement = screen.getByText(controlValue);
  expect(controlElement).toBeDefined();
});
