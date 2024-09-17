import { Fragment, type JSX, type ReactElement, type ReactNode } from "react";

import { Button } from "@planria/design/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@planria/design/card";
import { Icon } from "@planria/design/icon";

export interface PlanCardProps {
  name: string;
  description: string;
  price?: number;
  recurring?: "monthly" | "one every 3 months" | "yearly";
  features: ReactNode[];
  action: ReactElement | string;
}

// https://v0.dev/chat/Y_v0tugX5sq
export function PlanCard({
  name,
  description,
  price,
  recurring,
  features,
  action,
}: PlanCardProps): JSX.Element {
  const isEnterprise = name !== "Enterprise";

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="font-medium">{name}</CardTitle>
        <CardDescription className="text-base text-foreground tracking-wide">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEnterprise && (
          <Fragment>
            <p className="mt-2 text-4xl font-bold">{`$${price}`}</p>
            <p className="text-sm tracking-wide">{`per user/${recurring}`}</p>
          </Fragment>
        )}
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={String(feature)} className="flex items-center">
              <Icon name="Check" className="w-4 h-4 mr-2 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {typeof action === "string" ? (
          <Button className="w-full">{action}</Button>
        ) : (
          action
        )}
      </CardFooter>
    </Card>
  );
}
