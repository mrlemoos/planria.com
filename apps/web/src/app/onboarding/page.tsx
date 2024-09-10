import type { JSX } from "react";

import { Onboarding } from "$/domains/onboarding";
import { replicateCurrentUser } from "$/server/data/users";

export default async function Page(): Promise<JSX.Element> {
  await replicateCurrentUser();

  return <Onboarding />;
}
