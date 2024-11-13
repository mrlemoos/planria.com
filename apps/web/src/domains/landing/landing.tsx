import type { JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Particles } from "@planria/design/particles";

import { PlansCatalogue } from "$/domains/finances/plans-catalogue";
import { APP_VERSION } from "$/server/meta";

import { HeroSlogan } from "./hero-slogan";
import { InfrastructureAtScale } from "./infrastructure-at-scale";
import { LangSupport } from "./lang-support";
import { OssForeverEver } from "./oss-forever-ever";

export function Landing(): JSX.Element {
  return (
    <main className="min-h-screen">
      <div className="mt-40 mb-16 mx-auto container">
        <section className="flex justify-center my-12">
          <Badge asChild={true} variant="notice">
            <h2 className="text-4xl font-bold text-center">
              <span aria-label={`Version ${APP_VERSION} will be out soon`}>
                👀 v{APP_VERSION} will be out soon
              </span>
            </h2>
          </Badge>
        </section>

        <HeroSlogan />

        <section className="flex flex-col items-center gap-1 md:gap-3 my-10">
          <LangSupport />
        </section>
        <section className="my-56">
          <InfrastructureAtScale />
        </section>
        <section className="my-56">
          <OssForeverEver />
        </section>
        <section className="my-56">
          <PlansCatalogue />
        </section>
      </div>
      <Particles className="w-screen absolute top-32" />
    </main>
  );
}
