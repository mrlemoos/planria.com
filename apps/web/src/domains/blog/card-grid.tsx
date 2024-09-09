import type { JSX } from "react";

import { Button } from "@planria/design/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@planria/design/card";
import Link from "next/link";

export function BlogCardGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-3 md:gap-6 lg:gap-10 my-10">
      <Card>
        <CardHeader>
          <CardTitle>Implementing Clerk at scale</CardTitle>
          <CardDescription>
            Learn how to use this authentication service to secure your app.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild={true} variant="link">
            <Link href="/blog/posts/implementing-clerk-at-scale">
              Read more
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>planria and the feature flags on the edge</CardTitle>
          <CardDescription>
            See how we make the software to provide you with the best experience
            for your users.
          </CardDescription>
          <CardFooter>
            <Button asChild={true} variant="link">
              <Link href="/blog/posts/planria-and-the-feature-flags-on-the-edge">
                Read more
              </Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Why talk about trunk-based development?</CardTitle>
          <CardDescription>
            At planria we use trunk-based development to deliver features faster
            and with less risk. It can be seen as an extreme go-horse approach
            to software development. But it isn&apos;t.
          </CardDescription>
          <CardFooter>
            <Button asChild={true} variant="link">
              <Link href="/blog/posts/why-talk-about-trunk-based-development">
                Read more
              </Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Feature flags are <i>not</i> a software thing
          </CardTitle>
          <CardDescription>
            The project and product managers are the ones who should be
            interested in feature flags. They are the ones who can make the
            difference between a successful launch and a failed one.
          </CardDescription>
          <CardFooter>
            <Button asChild={true} variant="link">
              <Link href="/blog/posts/feature-flags-are-not-a-software-thing">
                Read more
              </Link>
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ship faster. Toggle it on later.</CardTitle>
          <CardDescription>
            Feature flags are a powerful technique that allows you to ship
            changes to your users quickly while reducing the risk of failure.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
