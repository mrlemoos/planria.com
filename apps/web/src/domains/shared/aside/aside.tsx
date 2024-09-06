"use client";

import { Fragment, type JSX } from "react";

import { Icon } from "@planria/design/icon";
import {
  SideBar,
  SideBarContent,
  SideBarItem,
  SideBarItemLabel,
  SidebarToggle,
} from "@planria/design/sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useStore } from "$/lib/hooks/store";
import { useSidebarToggle } from "$/lib/store/sidebar";

export function Aside(): JSX.Element | null {
  const params = useParams<{ projectId?: string }>();
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) {
    return null;
  }

  return (
    <SideBar isOpen={sidebar.isSidebarOpen} toggle={sidebar.toggleSidebar}>
      <SidebarToggle />
      <SideBarContent>
        {params.projectId && (
          <Fragment>
            <SideBarItem asChild={true}>
              <Link href={`/projects/${params.projectId}/environments`}>
                <Icon name="Grid" size={24} className="mr-1" />
                <SideBarItemLabel>Environments</SideBarItemLabel>
              </Link>
            </SideBarItem>
            <SideBarItem asChild={true}>
              <Link href={`/projects/${params.projectId}`}>
                <Icon name="Switch" size={24} className="mr-1" />
                <SideBarItemLabel>Feature Flags</SideBarItemLabel>
              </Link>
            </SideBarItem>
          </Fragment>
        )}
      </SideBarContent>
    </SideBar>
  );
}
