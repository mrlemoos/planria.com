import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  type JSX,
  type ReactNode,
} from "react";

import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import { Icon } from "@planria/design/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@planria/design/table";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import { date } from "@planria/util/date";
import Link from "next/link";

import { useProjectId } from "$/app/(projects)/projects/(management)/[projectId]/hooks";
import { useProjectManagement } from "$/domains/projects/context";
import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";
import {
  ConfirmDeleteFeatureFlagButton,
  ConfirmDeleteFeatureFlagDialog,
} from "./delete";

interface FeatureFlagRowContextType
  extends Pick<
    FeatureFlag,
    "description" | "featureFlagId" | "slug" | "defaultValue" | "updatedAt"
  > {}

const FeatureFlagRowContext = createContext<FeatureFlagRowContextType | null>(
  null
);

interface FeatureFlagRowProviderProps extends FeatureFlagRowContextType {
  children: ReactNode;
}

function FeatureFlagRowProvider({
  children,
  ...featureFlagRow
}: FeatureFlagRowProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(() => featureFlagRow, [featureFlagRow]);

  return (
    <FeatureFlagRowContext.Provider value={memoizedContextValue}>
      {children}
    </FeatureFlagRowContext.Provider>
  );
}

function useFeatureFlagRow(): FeatureFlagRowContextType {
  const context = useContext(FeatureFlagRowContext);

  if (context === null) {
    throw new Error(
      "The useFeatureFlagRow() hook has been called in a component that is not a descendant of the FeatureFlagRowProvider component. Please make sure that the FeatureFlagRowProvider component is an ancestor of this component."
    );
  }

  return context;
}

function TableViewHeader(): JSX.Element {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Slug</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Default status</TableHead>
        <TableHead>Last updated at</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}

function TableViewRow(): JSX.Element {
  const { featureFlagId, description, slug, updatedAt, defaultValue } =
    useFeatureFlagRow();
  const projectId = useProjectId();

  return (
    <Fragment>
      <TableRow key={featureFlagId}>
        <TableCell className="font-medium">{slug}</TableCell>
        <TableCell>{description || "-"}</TableCell>
        <TableCell>
          <Badge variant="secondary">{defaultValue ? "True" : "False"}</Badge>
        </TableCell>
        <TableCell>
          <time dateTime={updatedAt}>
            {date(updatedAt).format("YYYY MMMM DD [at] HH:mm")}
          </time>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <Button variant="ghost" size="icon" asChild={true}>
                  <Link
                    href={`/projects/${projectId}/feature-flags/${featureFlagId}/toggle`}
                  >
                    <Icon
                      name="Switch"
                      aria-hidden="true"
                      size={16}
                      className="mr-1"
                    />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Manage toggling</span>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
            <ConfirmDeleteFeatureFlagButton featureFlagId={featureFlagId} />
          </div>
        </TableCell>
      </TableRow>
      <ConfirmDeleteFeatureFlagDialog
        featureFlagSlug={slug}
        featureFlagId={featureFlagId}
      />
    </Fragment>
  );
}

export function TableView(): JSX.Element {
  const { featureFlags } = useProjectManagement();

  if (featureFlags.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">No feature flags created yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableViewHeader />
      <TableBody>
        {featureFlags.map(
          ({ featureFlagId, slug, defaultValue, description, updatedAt }) => (
            <FeatureFlagRowProvider
              key={featureFlagId}
              featureFlagId={featureFlagId}
              slug={slug}
              defaultValue={defaultValue}
              description={description}
              updatedAt={updatedAt}
            >
              <TableViewRow />
            </FeatureFlagRowProvider>
          )
        )}
      </TableBody>
    </Table>
  );
}
