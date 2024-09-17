"use client";

import type { JSX } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@planria/design/table";
import { heading } from "@planria/design/typography";
import { date } from "@planria/util/date";

import { TABLE_VIEW_DATE_FORMAT } from "../constants";
import { useEnvironments } from "../context";

export function EnvironmentsTableViewEmptyState(): JSX.Element {
  return (
    <div className="flex justify-center items-center flex-col h-[50dvh]">
      <h3 className={heading({ variant: "h3" })}>No environments found</h3>
      <p className="text-center mt-4">Create an environment to get started</p>
    </div>
  );
}

function EnvironmentsTableHeader(): JSX.Element {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>ID</TableHead>
        <TableHead>Created at</TableHead>
        <TableHead>Updated at</TableHead>
        <TableHead>
          <div className="sr-only">Actions</div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function EnvironmentsTableView(): JSX.Element {
  const { environments } = useEnvironments();

  if (environments.length === 0) {
    return <EnvironmentsTableViewEmptyState />;
  }

  return (
    <div className="min-h-[50dvh]">
      <Table>
        <EnvironmentsTableHeader />
        <TableBody>
          {environments.map(({ environmentId, name, createdAt, updatedAt }) => (
            <TableRow key={environmentId}>
              <TableCell>{name}</TableCell>
              <TableCell>{environmentId}</TableCell>
              <TableCell>
                {date(createdAt).format(TABLE_VIEW_DATE_FORMAT)}
              </TableCell>
              <TableCell>
                {date(updatedAt).format(TABLE_VIEW_DATE_FORMAT)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
