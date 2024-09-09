import type { JSX } from "react";

import { cn } from "@planria/design/css";
import { heading } from "@planria/design/typography";

import { BlogCardGrid } from "$/domains/blog/card-grid";

export default function Page(): JSX.Element {
  return (
    <div className="container mx-auto my-10 md:my-16">
      <section className="flex flex-col gap-5 md:gap-10 items-center justify-center">
        <h1 className={cn(heading({ variant: "h1" }))}>
          Welcome to our <span className="text-primary underline">Blog</span>
        </h1>
        <h2 className="text-muted-foreground text-lg">
          Here you can find articles about our products and services and the
          solutions we provide to our customers.
        </h2>
      </section>
      <BlogCardGrid />
    </div>
  );
}
