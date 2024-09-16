"use client";

import type { JSX } from "react";

import { Badge } from "@planria/design/badge";
import { Card, CardContent } from "@planria/design/card";
import { cn } from "@planria/design/css";
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

import type { AccessTokenAndEnvironment } from "$/lib/schemas/projects/access-tokens+environment";
import { fontMono } from "$/lib/styles/fonts";

import { TABLE_VIEW_DATE_FORMAT } from "./constants";
import { useAccessTokens } from "./context";

interface AccessTokenTableViewRowProps
  extends Pick<
    AccessTokenAndEnvironment,
    | "createdAt"
    | "environmentId"
    | "environmentName"
    | "tokenFourInitialCharacters"
    | "displayName"
  > {}

function AccessTokenTableViewRow({
  createdAt,
  environmentName,
  displayName,
  tokenFourInitialCharacters,
}: AccessTokenTableViewRowProps): JSX.Element {
  return (
    <TableRow>
      <TableCell>
        <Badge variant="secondary" className="inline-flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild={true}>
              <div className="flex items-center gap-x-1 cursor-help">
                <Icon name="LockClosed" aria-hidden="true" size={12} />
                <span className={cn(fontMono.className, "font-bold")}>
                  {tokenFourInitialCharacters}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="flex flex-col font-normal">
                <span>
                  These are the&nbsp;
                  <strong className="font-semibold">
                    first 4 characters of your access token
                  </strong>
                  . We encrypt and store the full token securely.
                </span>
                <span>
                  Click here to peek at the&nbsp;
                  <Link
                    href="https://github.com/mrlemoos/planria.com/blob/main/packages/util/src/crypto.ts#L11"
                    target="_blank"
                    className="underline"
                  >
                    code
                  </Link>
                  .
                </span>
              </div>
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </Badge>
      </TableCell>
      <TableCell>
        <span className="font-medium">{displayName}</span>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{environmentName}</Badge>
      </TableCell>
      <TableCell>
        <time dateTime={createdAt}>
          {date(createdAt).format(TABLE_VIEW_DATE_FORMAT)}
        </time>
      </TableCell>
      <TableCell>
        <span className="sr-only">Actions</span>
      </TableCell>
    </TableRow>
  );
}

export function AccessTokensTableView(): JSX.Element {
  const { accessTokens } = useAccessTokens();

  return (
    <Card className="border border-border">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Access token (4 initials)</TableHead>
              <TableHead>Display name</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accessTokens.map(
              ({
                accessTokenId,
                createdAt,
                environmentId,
                environmentName,
                displayName,
                tokenFourInitialCharacters,
              }) => (
                <AccessTokenTableViewRow
                  key={accessTokenId}
                  createdAt={createdAt}
                  environmentId={environmentId}
                  environmentName={environmentName}
                  displayName={displayName}
                  tokenFourInitialCharacters={tokenFourInitialCharacters}
                />
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
