import type { JSX } from "react";

import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { heading, muted } from "@planria/design/typography";

import { PlanCard } from "./plan-card";

export function PlansCatalogue(): JSX.Element {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-16">Pricing</h1>
      <section className="flex flex-col items-center justify-self-center w-full pb-32">
        <h2
          className={cn(
            muted(),
            "font-normal text-2xl text-center max-w-[min(768px,_100%)] mt-5",
            "text-foreground mb-20"
          )}
        >
          As currently in beta, we have a special offer for you to get started
          with Planria and help us shape&nbsp;
          <span className="underline underline-offset-2">
            the future of feature flags
          </span>
          .
        </h2>
        <PlanCard
          name="Earlybird"
          description="For those who believe in Planria from the beginning"
          price={7}
          recurring="monthly"
          features={[
            "Unlimited projects",
            "Unlimited environments per project",
            "Unlimited feature flags",
            "Unlimited users",
            "5 remote configs",
            "Guaranteed spot in our ❤️",
          ]}
          action="Let's do it!"
        />
      </section>
      <div>
        <hr className="border-t border-zinc-500/50 mt-10 mb-1" />
        <div className="flex flex-col justify-center">
          <span className="text-center text-muted-foreground my-10">Or</span>
          <h3 className={cn(heading({ variant: "h3" }), "text-center")}>
            Get to know our soon-to-come plans
          </h3>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-10 md:gap-14 sm:grid-cols-2 md:grid-cols-3 my-10 sm:my-16">
        <PlanCard
          name="Hobby"
          description="For personal projects and experiments"
          price={5}
          recurring="monthly"
          features={[
            "5 projects",
            "2 environments per project",
            "10 feature flags per project",
            "1 user",
          ]}
          action={
            <Button disabled={true} className="w-full">
              Coming soon
            </Button>
          }
        />
        <PlanCard
          name="Startup"
          description="For small teams getting started with feature flags"
          price={17}
          recurring="monthly"
          features={[
            "1 project",
            "3 environments per project",
            "50 feature flags",
          ]}
          action={
            <Button disabled={true} className="w-full">
              Coming soon
            </Button>
          }
        />
        <PlanCard
          name="Enterprise"
          description="For large teams and organizations"
          features={[
            "Unlimited projects",
            "Unlimited environments per project",
            "Unlimited feature flags",
            "Priority support 24/7",
          ]}
          action={
            <Button disabled={true} className="w-full">
              Coming soon
            </Button>
          }
        />
      </section>
    </div>
  );
}
