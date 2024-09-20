# The Root Line of Thought 🗳️

The SDK (Software Development Kit) is designed to help users write **Feature Flag as Code** [^1]

>
> Planria _is_ and _will always be_ developer-first. The experience should matter, how productive
> and happy you are when you have VSCode (or any other code editor) open on your computer.
>

## Defining feature flags in the editor

Developers should not and will not ask their engineering managers to create feature flags and
depend on them to decide the technical aspects of it, such as the default value and name.

When they use Planria, the technical aspects, _e.g._, defining feature flag and A/B experiments
will be addressed by the technical people – the developers. So when the product teams come 
and say "We'll have this functionality, and this, and this", we won't stop developers from doing 
what they do best – **develop**, they'll create the feature flags by *coding them*. 

Imagine the scenario above. The developer launches Code (or whatever editor they want), 
their project is a Next.js app for instance, so the file tree looks like this:

```plain
|-- my-brilliant-b2b-app/
  |-- src/
    |-- app/
      |-- page.tsx
      |-- layout.tsx
    |-- middleware.ts
    |-- flags.ts
  |-- next-env.d.ts
  |-- next.config.mjs
  |-- package.json
```

The `src/flags.ts` file is the one that will define their feature flags with the Planria SDK.
Let's take a peek at its insides:

```ts
import { flag, scale, variationsOf } from "@planria-sdk/node";

// As simple as that
export const isRevampedLandingHeroAvailable = flag({ defaultValue: false });

// ...Or if the engineering team decides to roll those three conflicting flags into one
export const whichProductLayout = flag({ 
  variants: ["grid", "flex", "minimalistic"],
  defaultValue: "grid",
});

// What if the product asks for a description of the feature flag?
export const isSlackIntegrationEnabled = flag({
  defaultValue: false,
  description: "Determine whether or not the Slack integration is enabled.",
});

export const experimental = scale({
  within: variationsOf([10, 20, 50]),
});
```

So they'll see description on Planria:

![Toggle Management page on Planria. Under the "About this flag" heading, the description field provides the following text: "Determine whether or not the Slack integration is enabled."](../screenshots/Apple%20Safari/Screenshot%202024-09-18%20Dark%20Mode%20-%20Feature%20Flags%20Toggle%20Management.png)

## Type-safe by default

You might have guessed it when you saw the example above and thought to yourself,
"Uh, this might generate the types as well." – And you're right.

We leverage the types that you - the developer - provide to the SDK and generate a
type inference that, as I say overly too many times a day, _works like a charm_.

```tsx
/* layout.tsx */
import type { JSX, ReactNode } from "react";
import { FlagProvider } from "@planria-sdk/nextjs";

export default function ({ children }: { children: ReactNode }): JSX.Element {
  return (
    <FlagProvider>
      {children}
    </FlagProvider>
  )
}

/* page.tsx */
import type { JSX } from "react";
import { Scope } from "@planria-sdk/nextjs";

import { isRevampedLandingHeroAvailable } from "@/flags";
import { RevampedLandingHero } from "@/domains/landing-hero";

export default function Page(): JSX.Element {
  return (
    <Scope flag={isRevampedLandingHeroAvailable} is={true}>
      <RevampedLandingHero />
    </Scope>
  );
}
```

## Consuming your flags

I believe, at least in my bird memory, that we can say that Planria is the first
feature flag management system built on top of the next-gen of web technologies
– by that I mean [Next.js](https://nextjs.org), [Vercel](https://vercel.com),
[Neon](https://neon.tech), [Dub](https://dub.co), [UploadThing](https://uploadthing.com),
and others (basically the T3 Stack on steroids). Anyways, it's neither here nor there,
I just wanted to point that out.

A few months ago, I watched a video by Theo Browne showing the client-side loaded
feature flags that Twitch has on its landing page. You could easily intercept
the request, modify the feature flags, and shift the user experience anyway you want.

Of course, the thought of changing something in your browser so you can access
something the app developers doesn't just sound _hacky_, but also makes me think
that there are no real security in apps that approach feature flags as-is today.
Okay, I'm not going to sound catatrosphising about it, but I've developed 
flag-dependent features and you know it's true.

I'm a big fan of Apple UX, I really am, and if you don't live in Mars and are waiting
for Musk to ride the tube back to Earth, you might know that the man who started it
was Steve Jobs. Jobs knew that the market doesn't know anything about what they want
until you show them _what_ and _why_ they want it.

**So here's what you want.** **You want** your apps to switch to stride on path A or B
_on the server_. **Why?** Because you can't trust the web browser with this kind of
sensible information and _what they can enable the "user" to do_ - It's like leaving a
key at the park nearby your house, can anyone try and open the right door? You don't 
want your feature flags taking forever to reflect the toggling you bugged your 
engineering manager to do. CDNs may not be all what we, the community, thought it would be, 
and this is one of those cases that it proves not to be the right solution. 
**Let's make feature flags server-first**, leveraging the _kind of misused_ edge runtime 
and - for the sake of my own patience with this sort of technology - 
let's have **type-safe feature flags** in my dev environment.

Welcome aboard.

- [^1](https://vercel.com/docs/workflow-collaboration/feature-flags/flags-pattern-nextjs)
