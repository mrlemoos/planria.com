export function containsDigit(value: string): boolean {
  return /\d/.test(value);
}

export function containsUppercase(value: string): boolean {
  return /[A-Z]/.test(value);
}

export function containsLowercase(value: string): boolean {
  return /[a-z]/.test(value);
}

export function containsSpecialCharacter(value: string): boolean {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
}
