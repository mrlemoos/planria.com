"use client";

import { Fragment, type JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Divider } from "@planria/design/divider";
import { Icon } from "@planria/design/icon";
import {
  SideBar,
  SideBarContent,
  SideBarItem,
  SideBarItemLabel,
  SidebarToggle,
} from "@planria/design/sidebar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@planria/design/tooltip";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useStore } from "$/lib/hooks/store";
import { useSidebarToggle } from "$/lib/store/sidebar";

export interface AsideProps {
  projectName: string;
  projectSlug: string;
  projectDescription?: string;
}

export function Aside({
  projectName,
  projectSlug,
  projectDescription,
}: AsideProps): JSX.Element | null {
  const params = useParams<{ projectId?: string }>();
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) {
    return null;
  }

  return (
    <SideBar isOpen={sidebar.isSidebarOpen} toggle={sidebar.toggleSidebar}>
      <SidebarToggle />
      <SideBarContent>
        <div className="flex flex-col items-center justify-center mt-10 mb-5">
          {sidebar.isSidebarOpen ? (
            <Fragment>
              <Badge variant="secondary">{projectSlug}</Badge>
              <span className="font-bold text-foreground">{projectName}</span>
              {!!projectDescription && (
                <span className="text-muted-foreground text-sm">
                  {projectDescription}
                </span>
              )}
            </Fragment>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild={true}>
                <div className="cursor-default font-semibold">
                  {projectName[0]}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <span>
                  {projectName} ({projectSlug})
                </span>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <Divider />
        {!!params.projectId && (
          <Fragment>
            <Tooltip>
              <TooltipTrigger>
                <SideBarItem asChild={true}>
                  <Link href={`/projects/${params.projectId}/environments`}>
                    <Icon
                      name="Grid"
                      size={24}
                      className="mr-1"
                      aria-label="Environments"
                    />
                    <SideBarItemLabel aria-hidden="true">
                      Environments
                    </SideBarItemLabel>
                  </Link>
                </SideBarItem>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={-10}>
                <span className="font-medium">Environments</span>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SideBarItem asChild={true}>
                  <Link href={`/projects/${params.projectId}/access-tokens`}>
                    <Icon
                      name="LockClosed"
                      size={24}
                      className="mr-1"
                      aria-label="Access Tokens"
                    />
                    <SideBarItemLabel aria-hidden="true">
                      Access Tokens
                    </SideBarItemLabel>
                  </Link>
                </SideBarItem>
                <TooltipContent side="right" sideOffset={-10}>
                  <span className="font-medium">Access Tokens</span>
                  <TooltipArrow />
                </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <SideBarItem asChild={true}>
                  <Link href={`/projects/${params.projectId}`}>
                    <Icon
                      name="Switch"
                      size={24}
                      className="mr-1"
                      aria-label="Feature Flags"
                    />
                    <SideBarItemLabel aria-hidden="true">
                      Feature Flags
                    </SideBarItemLabel>
                  </Link>
                </SideBarItem>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={-10}>
                <span className="font-medium">Feature Flags</span>
                <TooltipArrow />
              </TooltipContent>
            </Tooltip>
          </Fragment>
        )}
      </SideBarContent>
    </SideBar>
  );
}
