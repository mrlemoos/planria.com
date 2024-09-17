"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ButtonHTMLAttributes,
  type JSX,
  type ReactNode,
} from "react";

import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import { Divider } from "@planria/design/divider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@planria/design/dropdown-menu";
import { Icon } from "@planria/design/icon";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useUser } from "$/lib/hooks/user";
import { Project } from "$/lib/schemas/projects";

interface ProjectsSelectorContextType {
  projects: Project[];
}

const ProjectsSelectorContext =
  createContext<ProjectsSelectorContextType | null>(null);

interface ProjectsSelectorProviderProps extends ProjectsSelectorContextType {
  children: ReactNode;
}

function ProjectsSelectorProvider({
  children,
  projects,
}: ProjectsSelectorProviderProps): JSX.Element {
  const memoizedContextValue = useMemo(() => ({ projects }), [projects]);

  return (
    <ProjectsSelectorContext.Provider value={memoizedContextValue}>
      {children}
    </ProjectsSelectorContext.Provider>
  );
}

function useProjectsSelectorContext() {
  const context = useContext(ProjectsSelectorContext);
  if (context === null) {
    throw new Error(
      "The useProjectsSelectorContext() hook cannot be called outside of the ProjectsSelectorProvider component."
    );
  }
  return context;
}

export interface ProjectSelectorMenuProps extends ProjectsSelectorContextType {
  children: ReactNode;
}

export function ProjectSelectorMenu({
  children,
  projects,
}: ProjectSelectorMenuProps): JSX.Element {
  return (
    <ProjectsSelectorProvider projects={projects}>
      <DropdownMenu position="bottom-center" gap={20}>
        {children}
      </DropdownMenu>
    </ProjectsSelectorProvider>
  );
}

export interface ProjectSelectorMenuTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {}

export function ProjectSelectorMenuTrigger(
  props: ProjectSelectorMenuTriggerProps
): JSX.Element {
  const { projects } = useProjectsSelectorContext();
  const params = useParams<{ projectId: string }>();
  const currentProject = useMemo(
    () => projects.find(({ projectId }) => projectId === params.projectId),
    [projects, params.projectId]
  );
  return (
    <DropdownMenuTrigger asChild={true}>
      <Button {...props} size="sm" variant="secondary">
        {currentProject?.name || "Select project"}
      </Button>
    </DropdownMenuTrigger>
  );
}

export function ProjectSelectorMenuContent(): JSX.Element {
  const params = useParams<{ projectId: string }>();
  // ^^ Think a better way to handle this
  const { user } = useUser();
  const { projects } = useProjectsSelectorContext();
  const currentProjectId = params.projectId;
  return (
    <DropdownMenuContent>
      {projects?.map(({ projectId, name, ownerId, slug }) => {
        const isCurrentUserOwner = ownerId === user?.userId;
        const isCurrentProject = projectId === currentProjectId;
        return (
          <DropdownMenuItem
            key={projectId}
            asChild={true}
            className={cn(
              isCurrentProject &&
                "bg-zinc-200 dark:bg-zinc-800 pointer-events-none"
            )}
          >
            <Link
              href={`/projects/${projectId}`}
              className="flex items-end justify-between min-w-[428px]"
            >
              <span className="flex flex-col">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{slug}</span>
              </span>
              <div className="flex items-center gap-3">
                {isCurrentProject && <Badge variant="primary">Current</Badge>}
                {isCurrentUserOwner && <Badge variant="secondary">Owner</Badge>}
              </div>
            </Link>
          </DropdownMenuItem>
        );
      })}
      <Divider />
      <DropdownMenuItem asChild={true}>
        <Button variant="ghost" size="sm" asChild={true}>
          <Link href="/onboarding">
            <Icon name="Plus" size={16} aria-hidden="true" />
            <span>Create project</span>
          </Link>
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
