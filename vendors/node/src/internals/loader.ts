import fs from "node:fs";
import path from "node:path";

import { Flag } from "../node";

import { FLAG_SCHEMA_FILENAME } from "./constants";

/**
 * A flag schema is a record of flags where the key is the flag name
 * and the value is the flag object.
 */
export type FlagSchema = Record<string, Flag<unknown>>;

/**
 * A flag creation input is a data transfer object that contains the flag name
 * and the object to be created with the necessary metadata.
 */
export class FlagCreationInput {
  constructor(
    public readonly name: string,
    public readonly flag: Flag<unknown>
  ) {}
}

/**
 * [INTERNAL]
 *
 * Asynchronously loads into memory the flag schema from the given file path.
 */
async function loadFlagSchemaIntoModule(pathname: string): Promise<FlagSchema> {
  const schema = (await import(pathname)) as Promise<FlagSchema>;
  return schema;
}

/**
 * [INTERNAL]
 *
 * Asynchronously loads into memory the flag schemas from the current directory
 * by looking for the flag schema file.
 */
async function loadFlagSchemaIntoModuleWithinCurrentDirectory(): Promise<FlagSchema> {
  const pathname = path.resolve(process.cwd(), FLAG_SCHEMA_FILENAME);
  return await loadFlagSchemaIntoModule(pathname);
}

/**
 * [INTERNAL]
 *
 * Asynchronously loads into memory the flag schemas from the source folder
 * by looking for the flag schema file.
 */
async function loadFlagSchemaIntoModuleWithinSourceFolder(): Promise<FlagSchema> {
  const pathname = path.resolve(process.cwd(), "src", FLAG_SCHEMA_FILENAME);
  return await loadFlagSchemaIntoModule(pathname);
}

/**
 * Asynchronously loads the flag schema from the current directory or source folder.
 */
export async function loadCoercedFlagSchema(): Promise<FlagSchema> {
  if (hasSourceFolder()) {
    return await loadFlagSchemaIntoModuleWithinSourceFolder();
  }
  return await loadFlagSchemaIntoModuleWithinCurrentDirectory();
}

/**
 * Parses the flag module schema into a list of objects ready to be used to
 * create the flags via HTTP protocol.
 */
export async function parseFlagSchema(
  /**
   * The flag schema to parse into a list of flag creation inputs.
   */
  schema: FlagSchema
): Promise<FlagCreationInput[]> {
  const inputs: FlagCreationInput[] = [];

  for (const [name, flag] of Object.entries(schema)) {
    inputs.push(new FlagCreationInput(name, flag));
  }

  return inputs;
}

/**
 * Synchronously verifies whether or not the current directory has a source folder.
 */
export function hasSourceFolder(): boolean {
  return fs.existsSync(path.resolve(process.cwd(), "src"));
}
