import type { JSX } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  type CardProps,
} from "@planria/design/card";

import { useProjectManagement } from "$/domains/projects/context";

export interface BoxCardProps extends CardProps {}

export function BoxCard({ children, ...props }: BoxCardProps): JSX.Element {
  const { featureFlags } = useProjectManagement();
  const totalFeatureFlags = featureFlags.length;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Feature Flags</CardTitle>
        {!!featureFlags.length && (
          <CardDescription>{`This project has ${totalFeatureFlags} feature flags`}</CardDescription>
        )}
      </CardHeader>
      {children}
    </Card>
  );
}

export { CardContent as BoxCardContent };
