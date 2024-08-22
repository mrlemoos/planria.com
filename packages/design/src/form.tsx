"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
  type JSX,
} from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import { cn } from "./css";
import { Label } from "./label";

export { useForm, zodResolver };

export const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends ControllerProps<TFieldValues, TName> {}

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ ...props }: FormFieldProps<TFieldValues, TName>): JSX.Element {
  const memoizedContextValue = useMemo(
    () => ({
      name: props.name,
    }),
    [props.name]
  );

  return (
    <FormFieldContext.Provider value={memoizedContextValue}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

interface FormItemContextValue {
  id: string;
}

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {}

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, forwardedRef) => {
    const id = useId();
    const memoizedContextValue = useMemo(() => ({ id }), [id]);

    return (
      <FormItemContext.Provider value={memoizedContextValue}>
        <div
          ref={forwardedRef}
          className={cn("space-y-2", className)}
          {...props}
        />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

export interface FormLabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}

export const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

export interface FormControlProps
  extends ComponentPropsWithoutRef<typeof Slot> {}

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  FormControlProps
>(({ ...props }, forwardedRef) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={forwardedRef}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

export interface FormDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, forwardedRef) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={forwardedRef}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export interface FormMessageProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <p
        ref={forwardedRef}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";
