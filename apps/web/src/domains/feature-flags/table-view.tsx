import {
  Fragment,
  createContext,
  useContext,
  useMemo,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@planria/design/dropdown-menu";
import { Icon } from "@planria/design/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@planria/design/table";
import { date } from "@planria/util/date";

import { useProjectManagement } from "$/domains/projects/management/context";
import type { FeatureFlag } from "$/lib/schemas/projects/feature-flags";

import { BadgeStatus } from "./badge-status";
import { ToggleDrawer, ToggleFeatureFlagForm } from "./toggle";

interface FeatureFlagRowContextType
  extends Pick<
    FeatureFlag,
    "description" | "featureFlagId" | "slug" | "value" | "updatedAt"
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
        <TableHead>Status</TableHead>
        <TableHead>Environments</TableHead>
        <TableHead>Last update</TableHead>
        <TableHead>
          <span className="sr-only">Actions</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

function TableViewRow(): JSX.Element {
  const { featureFlagId, description, slug, updatedAt, value } =
    useFeatureFlagRow();
  const [isToggleDrawerOpen, setToggleDrawerVisibilityStatus] = useState(false);

  function handleOpenToggleDrawer() {
    return setToggleDrawerVisibilityStatus(true);
  }

  function handleCloseToggleDrawer() {
    return setToggleDrawerVisibilityStatus(false);
  }

  return (
    <Fragment>
      <ToggleDrawer
        featureFlagId={featureFlagId}
        currentValue={value}
        slug={slug}
        isOpen={isToggleDrawerOpen}
        onClose={handleCloseToggleDrawer}
      >
        <ToggleFeatureFlagForm
          featureFlagId={featureFlagId}
          currentValue={value}
          slug={slug}
          description={description}
        />
      </ToggleDrawer>

      <TableRow key={featureFlagId}>
        <TableCell className="font-medium">{slug}</TableCell>
        <TableCell>{description || "-"}</TableCell>
        <TableCell>
          <BadgeStatus isEnabled={value} />
        </TableCell>
        <TableCell>
          <Badge variant="outline">Production</Badge>
          <Badge variant="outline">Staging</Badge>
          <Badge variant="outline">Development</Badge>
        </TableCell>
        <TableCell>
          <time dateTime={updatedAt}>
            {date(updatedAt).format("YYYY MMMM DD [at] HH:mm")}
          </time>
        </TableCell>
        <TableCell>
          <DropdownMenu position="bottom-center" offset={12}>
            <DropdownMenuTrigger asChild={true}>
              <Button variant="ghost" size="icon">
                <Icon name="DropdownMenu" aria-hidden="true" size={18} />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Icon name="Switch" aria-hidden="true" size={16} />
                Toggle
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Pencil2" aria-hidden="true" size={16} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Trash" aria-hidden="true" size={16} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
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
          ({ featureFlagId, slug, value, description, updatedAt }) => (
            <FeatureFlagRowProvider
              key={featureFlagId}
              featureFlagId={featureFlagId}
              slug={slug}
              value={value}
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
