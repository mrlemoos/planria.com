import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z as zod } from "zod";

import {
  containsDigit,
  containsLowercase,
  containsSpecialCharacter,
  containsUppercase,
} from "./strings";

export function isPasswordValid(value: string): boolean {
  return (
    containsDigit(value) &&
    containsUppercase(value) &&
    containsLowercase(value) &&
    containsSpecialCharacter(value)
  );
}

export function email({
  invalidEmailMessage = "Invalid email address",
}: {
  invalidEmailMessage?: string;
} = {}) {
  return zod
    .string()
    .email({ message: invalidEmailMessage })
    .transform((value) => value.trim());
}

export function password({
  minLengthMessage = "Password must be at least 8 characters",
  maxLengthMessage = "Password must be at most 30 characters",
  invalidPasswordMessage = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
} = {}) {
  return zod
    .string()
    .min(8, minLengthMessage)
    .max(30, maxLengthMessage)
    .refine((value) => isPasswordValid(value), invalidPasswordMessage)
    .transform((value) => value.trim());
}

export const z = { ...zod, email, password };
extendZodWithOpenApi(z); // https://github.com/asteasolutions/zod-to-openapi

export * from "zod";
export type { infer as Infer, output as Output } from "zod";
