import type { JSX } from "react";

import { Onboarding } from "$/domains/onboarding";
import { replicateCurrentUser } from "$/server/data/users";

export const dynamic = "force-dynamic";

export default async function Page(): Promise<JSX.Element> {
  await replicateCurrentUser();

  return <Onboarding />;
}
