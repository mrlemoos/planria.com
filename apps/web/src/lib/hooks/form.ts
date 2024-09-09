import { useRef, type FormEvent as ReactFormEvent } from "react";

import type { FieldValues, UseFormReturn } from "@planria/design/form";

/**
 * Custom hook that handles form submission for a given form and form action.
 *
 * This custom hook is a shortcut for the common pattern of handling form submission
 * when utilising React Hook Form with form server actions. See the example below
 * of what it does under the hood:
 * ```tsx
 * import { useFormState } from "react-dom";
 * import { useForm } from "@planria/design/form";
 *
 * // ...
 * const [formState, formAction] = useFormState(myServerFormAction, initialState);
 * const form = useForm({ ... });
 *
 * return (
 *  <form
 *    action={formAction}
 *    ref={formRef}
 *    onSubmit={(event) => {
 *      event.preventDefault();
 *      form.handleSubmit(() => {
 *        formAction(new FormData(formRef.current!));
 *      })(event);
 *    }}>...</form>
 * )
 * ```
 *
 * By using this custom hook, you can simplify the form submission logic to:
 * ```tsx
 * import { useFormAction } from "@planria/design/form";
 *
 * // ...
 *
 * const [formState, formAction] = useFormState(myServerFormAction, initialState);
 * const form = useForm({ ... });
 * const { boundFormRef, handleSubmit } = useFormAction(form, formAction);
 *
 * return (
 *   <form
 *     action={formAction}
 *     ref={boundFormRef}
 *     onSubmit={handleSubmit}
 *   >...</form>
 * )
 * ```
 *
 * @template T The type of the form field values.
 * @param form The form object returned by the `useForm` hook.
 * @param formAction The function to be called when the form is submitted.
 * @returns An object containing the `handleSubmit` function to be used as the form's `onSubmit` handler.
 */
export function useFormAction<T extends FieldValues>(
  form: UseFormReturn<T>,
  formAction: (formData: FormData) => void,
  options?: {
    composeFormData?: (currentFormData: FormData) => FormData;
  }
) {
  const boundFormRef = useRef<HTMLFormElement>(null);

  /**
   * Handles the form submission event by executing the form to which the
   * form reference was bound to and action was passed.
   *
   * Note: It's important that the `boundFormRef` is bound to the form element
   * that is being submitted and the form action is passed to the native form
   * element via the `action` attribute.
   */
  function handleSubmit(event: ReactFormEvent<HTMLFormElement>) {
    event.preventDefault();
    form.handleSubmit(() => {
      const currentFormData = new FormData(boundFormRef.current!);
      const iteratedFormData =
        // iterate the form data if it needs to be modified before submission
        options?.composeFormData?.(currentFormData) ?? currentFormData;
      formAction(iteratedFormData);
    })(event);
  }

  return {
    handleSubmit,
    boundFormRef,
  };
}
