"use client";

import { forwardRef, type SVGAttributes } from "react";

import { removeSuffix, type SuppressSuffix } from "@planria/util/strings";
import * as Radix$Icons from "@radix-ui/react-icons";

import { cn } from "./css";

type RawIconsObject = typeof Radix$Icons;
type KeysOfRawIcons = keyof RawIconsObject;

export type IconName = SuppressSuffix<KeysOfRawIcons, "Icon">;

export const icons = Object.entries(Radix$Icons).reduce<
  Record<IconName, RawIconsObject[`${IconName}Icon`]>
>((acc, [key, value]) => {
  acc[removeSuffix(key, "Icon") as IconName] = value;
  return acc;
}, {} as Record<IconName, RawIconsObject[`${IconName}Icon`]>);

export interface IconProps
  extends Omit<SVGAttributes<SVGSVGElement>, "children"> {
  name: IconName;
  size?: number;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size, width, height, className, ...props }, forwardedRef) => {
    const Icon = icons[name];

    const iconHeight = height || size;
    const iconWidth = width || size;

    if (!Icon) {
      console.error(
        `The string literal "${name}" does not correspond to any of the icons in the "icons" object. See your implementation of the <Icon name={${name}} /> component. So to avoid any further issues, the Icon component will return null in the JSX expression.`
      );
      return null;
    }

    if (size) {
      if (height) {
        console.warn(
          `The "size" prop is set to ${size} and the "height" prop is set to ${height}. The "height" prop will override the "size" prop. It is not recommended to use the "size" prop in combination with "height" and "width" props. Please see the implementation of the <Icon name="${name}" size={${size}} height={${height}} /> component.`
        );
      }
      if (width) {
        console.warn(
          `The "size" prop is set to ${size} and the "width" prop is set to ${width}. The "width" prop will override the "size" prop. It is not recommended to use the "size" prop in combination with "width" and "width" props. Please see the implementation of the <Icon name="${name}" size={${size}} width={${width}} /> component.`
        );
      }
    }

    return (
      <Icon
        width={iconWidth}
        height={iconHeight}
        className={cn(className)}
        ref={forwardedRef}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";
