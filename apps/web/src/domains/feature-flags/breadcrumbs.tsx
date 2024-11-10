"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@planria/design/breadcrumb";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { JSX } from "react";

export interface BreadcrumbsProps {
  featureFlagSlug: string;
}

export function Breadcrumbs({
  featureFlagSlug,
}: BreadcrumbsProps): JSX.Element {
  const params = useParams<{ projectId?: string }>();

  const href = params.projectId ? `/projects/${params.projectId}` : "/projects";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild={true}>
            <Link href={href}>Project</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Feature Flags</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{featureFlagSlug}</BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
