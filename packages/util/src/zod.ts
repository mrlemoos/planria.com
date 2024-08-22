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

export function email() {
  return zod
    .string()
    .email()
    .transform((value) => value.trim());
}

export function password() {
  return zod
    .string()
    .min(8)
    .max(30)
    .refine((value) => isPasswordValid(value))
    .transform((value) => value.trim());
}

export const z = { ...zod, email, password };

export * from "zod";
export type { infer as Infer } from "zod";
