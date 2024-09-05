export const PRODUCTION_ENVIRONMENT = {
  name: "production",
  label: "Production",
} as const;

export const STAGING_ENVIRONMENT = {
  name: "staging",
  label: "Staging",
} as const;

export const DEVELOPMENT_ENVIRONMENT = {
  name: "development",
  label: "Development",
} as const;

export const ENVIRONMENTS = [
  PRODUCTION_ENVIRONMENT,
  STAGING_ENVIRONMENT,
  DEVELOPMENT_ENVIRONMENT,
] as const;

export const SDK_SUPPORTED_PROGRAMMING_LANGUAGES = [
  "javascript",
  "typescript",
] as const;

export type SDKSupportedProgrammingLanguage =
  (typeof SDK_SUPPORTED_PROGRAMMING_LANGUAGES)[number];
