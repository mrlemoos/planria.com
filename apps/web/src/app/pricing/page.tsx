import type { JSX } from "react";

import { PlansCatalogue } from "$/domains/finances/plans-catalogue";

export default function Page(): JSX.Element {
  return (
    <div className="mx-auto container">
      <PlansCatalogue />
    </div>
  );
}
