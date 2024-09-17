import type { JSX } from "react";

import { AccessTokensTableView } from "$/domains/access-tokens/views/table-view";

export const dynamic = "force-dynamic";

export default function Page(): JSX.Element {
  return <AccessTokensTableView />;
}
