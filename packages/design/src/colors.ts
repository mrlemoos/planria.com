/**
 * Transforms a given hexadecimal colour to its RGB equivalent and returns the [green, red, blue] values in a tuple.
 *
 * @example
 * ```ts
 * const hex = "#ff0000";
 * const rgb = transformHexadecimalToRGB(hex);
 * console.log(rgb); // [255, 0, 0]
 * ```
 */
export function transformHexadecimalToRGB(
  hex: string
): [number, number, number] {
  const hexadecimal = hex.replace("#", "");

  if (hexadecimal.length === 3) {
    // expands shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const expandedHex = hexadecimal
      .split("")
      .map((char) => char + char)
      .join("");
    return transformHexadecimalToRGB(`#${expandedHex}`);
  }

  const hexInt = Number.parseInt(hexadecimal, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}
