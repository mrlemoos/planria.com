/**
 * The encoding of the buffer.
 */
export const BUFFER_ENCODING = "utf-8" as const;

/**
 * The filename of the schema file.
 */
export const FLAG_SCHEMA_FILENAME = "flags.ts" as const;

/**
 * The base URL of the Planria API.
 */
export const BASE_API_URL = "https://planria.com/api" as const;

/**
 * The key of the header in which the SDK provides the HTTP API with the ID to identify the project.
 */
export const PLANRIA_PROJECT_ID_HEADER_KEY = "x-planria-project";
/**
 * The key of the header in which the SDK provides the HTTP API with the ID to identify the environment.
 */
export const PLANRIA_ENVIRONMENT_ID_HEADER_KEY = "x-planria-environment";
/**
 * The key of the header in which the SDK provides the HTTP API with the access token.
 */
export const PLANRIA_ACCESS_TOKEN_HEADER_KEY = "x-planria-access-token";
