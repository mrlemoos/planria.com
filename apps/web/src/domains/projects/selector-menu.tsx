"use client";

import type { ButtonHTMLAttributes, JSX, ReactNode } from "react";

import { Project } from "$/lib/schemas/projects";
import { Badge } from "@planria/design/badge";
import { Button } from "@planria/design/button";
import { cn } from "@planria/design/css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@planria/design/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface ProjectSelectorMenuTriggerProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {}

export function ProjectSelectorMenuTrigger(
  props: ProjectSelectorMenuTriggerProps
): JSX.Element {
  return (
    <DropdownMenuTrigger asChild={true}>
      <Button {...props} size="sm" variant="secondary">
        Select project
      </Button>
    </DropdownMenuTrigger>
  );
}

export interface ProjectSelectorMenuProps {
  children: ReactNode;
}

export function ProjectSelectorMenu({
  children,
}: ProjectSelectorMenuProps): JSX.Element {
  return (
    <DropdownMenu position="bottom-center" gap={20}>
      {children}
    </DropdownMenu>
  );
}

export interface ProjectSelectorMenuContentProps {
  projects: Project[];
  currentUserId: string;
}

export function ProjectSelectorMenuContent({
  projects,
  currentUserId,
}: ProjectSelectorMenuContentProps): JSX.Element {
  const params = useParams<{ projectId: string }>();
  // ^^ Think a better way to handle this
  const currentProjectId = params.projectId;
  return (
    <DropdownMenuContent>
      {projects.map(({ projectId, name, ownerId, slug }) => {
        const isCurrentUserOwner = ownerId === currentUserId;
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
    </DropdownMenuContent>
  );
}
