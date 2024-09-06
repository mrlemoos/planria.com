import type { JSX } from "react";

import type { Environment } from "$/lib/schemas/projects/environments";

export interface EnvironmentsListViewProps {
  environments: Environment[];
}

export function EnvironmentsListView({
  environments,
}: EnvironmentsListViewProps): JSX.Element {
  return (
    <ul className="flex flex-col">
      {environments.map(({ environmentId, name }) => (
        <li key={environmentId} className="flex flex-row">
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
