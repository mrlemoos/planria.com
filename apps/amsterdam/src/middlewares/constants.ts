export const REQUIRED_HTTP_HEADERS = {
  AUTHORIZATION: "authorization",
  ENVIRONMENT_ID: "x-planria-environment",
  PROJECT_ID: "x-planria-project",
} as const;

export const RESPONSE_HTTP_HEADERS = {
  API_VERSION: "x-planria-api-version",
} as const;
