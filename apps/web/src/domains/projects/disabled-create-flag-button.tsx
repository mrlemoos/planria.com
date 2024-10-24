import type { JSX } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { Button } from "@planria/design/button";
import Link from "next/link";

export interface DisabledCreateFlagButtonProps {
  projectId: string;
}

export function DisabledCreateFlagButton({
  projectId,
}: DisabledCreateFlagButtonProps): JSX.Element {
  return (
    <Tooltip>
      <TooltipTrigger asChild={true}>
        <div className="cursor-not-allowed">
          <Button size="sm" type="button" disabled={true}>
            Create flag
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        You need to create an environment first. Click&nbsp;
        <Link
          href={`/projects/${projectId}/environments`}
          className="text-primary"
        >
          here
        </Link>
        &nbsp;to go to environments.
      </TooltipContent>
    </Tooltip>
  );
}
