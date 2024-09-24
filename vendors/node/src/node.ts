import { assert } from "@planria/util/assert";

/**
 * Defines a variation of percentiles for experimentations.
 * The percentiles must sum to 100.
 */
export function variationOf(...percentiles: number[]) {
  const sum = percentiles.reduce((acc, p) => acc + p, 0);
  assert(
    sum !== 100,
    `The sum of the percentiles must be equal to 100. Please revisit the values provided for the percentiles at variationOf(${percentiles.join(
      ", "
    )})`
  );
  return percentiles;
}

/**
 * The options for defining a feature flag.
 */
export type FlagOptions<
  TValueType,
  TValueDefinition = TValueType extends string
    ? {
        variants: TValueType[];
      }
    : {}
> = TValueDefinition & {
  defaultValue: TValueType;
};

/**
 * A class that represents a feature flag with the given options.
 */
export class Flag<TValueType> {
  constructor(private options: FlagOptions<TValueType>) {}

  /**
   * Returns the default value of the {@link TValueType | flag}.
   */
  defaultValue(): TValueType {
    return this.options.defaultValue;
  }

  /**
   * Returns the variants of the flag. If the flag is not a string, it will return an empty array.
   */
  variants(): TValueType[] {
    if ("variants" in this.options) {
      return this.options.variants;
    }
    return [];
  }
}

/**
 * Defines a feature flag with the given options.
 */
export function flag<TValueType>(options: FlagOptions<TValueType>) {
  return { ...options };
}
